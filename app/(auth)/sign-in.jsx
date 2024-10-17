import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoginStore, useSignupStore } from "../store/signupStore"; // Import login store
import { storeToken } from "./authUtils";
WebBrowser.maybeCompleteAuthSession();

// Discovery URLs for Google and Microsoft
const googleDiscovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

const microsoftDiscovery = {
  authorizationEndpoint:
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  tokenEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
};

export default function LoginScreen() {
  const router = useRouter();
  const { fetchLoginData } = useLoginStore();
  const { sendOtp } = useSignupStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Local error state
  const [userInfo, setUserInfo] = useState(null); // User info From OAuth

  // Google OAuth Function
  const googleAuth = async () => {
    try {
      const clientId =
        "963918752399-hdsnjr0e6786b0i5c8sva5ijgno5d5bs.apps.googleusercontent.com"; // IOS APPS TODO Android needed
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

      const request = new AuthSession.AuthRequest({
        clientId,
        scopes: ["openid", "profile", "email"],
        redirectUri,
      });

      const authResponse = await request.promptAsync(googleDiscovery);

      if (authResponse.type === "success") {
        const tokenResponse = await fetch(googleDiscovery.tokenEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `code=${authResponse.params.code}&client_id=${clientId}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
        });

        const tokenResult = await tokenResponse.json();
        const { access_token } = tokenResult;

        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        const user = await userInfoResponse.json();
        setUserInfo({ email: user.email, token: access_token });
      }
    } catch (error) {
      console.error("Google Authentication Error:", error);
    }
  };

  // Microsoft OAuth Function
  const microsoftAuth = async () => {
    try {
      const clientId = "29d4dc7b-ed5b-44cb-a789-250f11ccdeee"; // TODO NEED TO CHANGE
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

      const request = new AuthSession.AuthRequest({
        clientId,
        scopes: ["openid", "profile", "email", "User.Read"],
        redirectUri,
      });

      const authResponse = await request.promptAsync(microsoftDiscovery);

      if (authResponse.type === "success") {
        const tokenResponse = await fetch(microsoftDiscovery.tokenEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `code=${authResponse.params.code}&client_id=${clientId}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
        });

        const tokenResult = await tokenResponse.json();
        const { access_token } = tokenResult;

        const userInfoResponse = await fetch(
          "https://graph.microsoft.com/v1.0/me",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        const user = await userInfoResponse.json();
        setUserInfo({
          email: user.mail || user.userPrincipalName,
          token: access_token,
        });
      }
    } catch (error) {
      console.error("Microsoft Authentication Error:", error);
    }
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true); // Start loading

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false); // Stop loading on error
      return;
    }

    // Validate password
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false); // Stop loading on error
      return;
    }

    try {
      const resp = await fetchLoginData({ email, password }); // Call the login API
      if (!resp.error && resp.token) {
        await storeToken(resp.token);
        if (resp.otp) {
          const otpResp = await sendOtp(resp.contact);
          await AsyncStorage.setItem("@phone", resp.contact); // Use a string key for storage
          if (otpResp.success) {
            Alert.alert(
              "Success",
              "Verification Pending..! Please check your SMS for the OTP.",
              [
                {
                  text: "OK",
                  onPress: () => router.navigate(`/OtpVerificationScreen`),
                },
              ]
            );
          }
        } else {
          Alert.alert("Success", "Login successful!", [
            { text: "OK", onPress: () => router.navigate("/home") },
          ]);
        }
      } else {
        setError(resp.message || "An error occurred");
      }
    } catch (error) {
      // Catch any unexpected errors
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  const handleMicrosoftLogin = () => {
    console.log("Microsoft login pressed");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Sign In</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.microsoftButton}
          onPress={microsoftAuth}
        >
          <Ionicons name="logo-windows" size={24} color="white" />
          <Text style={styles.microsoftButtonText}>Sign in with Microsoft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={googleAuth}>
          <Ionicons name="logo-google" size={24} color="white" />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f2f2f7",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 17,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#FF0000",
    fontSize: 17,
    fontWeight: "400",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5EA",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#8E8E93",
    fontSize: 15,
    fontWeight: "600",
  },
  microsoftButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0078D4",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  microsoftButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34a853",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  googleButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 10,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 17,
    color: "#000000",
  },
  signupLink: {
    color: "#007AFF",
    fontSize: 17,
    fontWeight: "600",
  },
  errorText: {
    color: "#FF0000!important",
    marginTop: 8,
    marginBottom: 16,
    textAlign: "center",
  },
});
