import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignupStore } from "../store/signupStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { verifyOtp } = useSignupStore(); // Add this function to your store
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const getPhoneNumber = async () => {
      try {
        const value = await AsyncStorage.getItem("@phone");
        if (value !== null) {
          setPhone(value);
        }
      } catch (e) {
        console.error("Failed to load phone number", e);
      }
    };
    getPhoneNumber();
  }, []);

  const handleVerifyOtp = async () => {
    setError("");

    if (otp.length !== 6) {
      // Assuming OTP length is 6
      setError("Please enter a valid OTP.");
      return;
    }

    try {
      const resp = await verifyOtp(otp, phone); // Call the OTP verification method
      if (resp.success) {
        Alert.alert("Success", "OTP verified successfully!", [
          { text: "OK", onPress: () => router.navigate("/home") },
        ]);
      } else {
        setError(resp.message || "Failed to verify OTP");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6} // Assuming OTP length is 6
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f2f2f7",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 17,
  },
  verifyButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
});
