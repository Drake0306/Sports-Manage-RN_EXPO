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
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useSignupStore } from "../store/signupStore";
import { storeToken } from "./authUtils";
import { ArrowLeft } from "lucide-react-native";

export default function SignupScreen() {
  const router = useRouter();
  const { signup, sendOtp, loading } = useSignupStore();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [items, setItems] = useState([
    { label: "Select Role", value: null, disabled: true },
    { label: "Coach", value: "coach" },
    { label: "Parent", value: "parent" },
    { label: "User", value: "user" },
  ]);

  const countryCodeItems = [
    { label: "+1 (USA)", value: "1" },
    { label: "+44 (UK)", value: "44" },
    { label: "+91 (India)", value: "+91" },
    // Add more country codes as needed
  ];

  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    // Validate new fields
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !role ||
      !contactNumber ||
      !dateOfBirth ||
      !countryCode
    ) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contactNumber)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    try {
      const resp = await signup({
        firstname,
        lastname,
        email,
        password,
        role,
        contactNumber,
        dateOfBirth,
      });

      if (!resp.error && resp.token) {
        const fullContactNumber = `${countryCode}${contactNumber}`;
        const otpResp = await sendOtp(fullContactNumber);
        await AsyncStorage.setItem("@phone", fullContactNumber); // Use a string key for storage


        if (otpResp.success) {
          await storeToken(resp.token);
          Alert.alert(
            "Success",
            "Account created successfully! Please check your SMS for the OTP.",
            [
              {
                text: "OK",
                onPress: () => router.navigate(`/OtpVerificationScreen`),

              },
            ]
          );
        } else {
          setError(otpResp.message || "Failed to send OTP");
        }
      } else {
        setError(resp.message || "An unexpected error occurred");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <DropDownPicker
            open={openRole}
            value={role}
            items={items}
            setOpen={setOpenRole}
            setValue={setRole}
            setItems={setItems}
            placeholder="Select Role"
            style={styles.dropdown}
          />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastname}
            onChangeText={setLastname}
          />
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
          <View style={styles.mobileInputContainer}>
            <DropDownPicker
              open={openCode}
              value={countryCode}
              items={countryCodeItems}
              setOpen={setOpenCode}
              setValue={setCountryCode}
              placeholder="STD"
              style={styles.dropdown}
              containerStyle={{ width: 80 }} // Fixed width for the dropdown
            />
            <TextInput
              style={styles.mobileInput}
              placeholder="Mobile Number"
              value={contactNumber}
              onChangeText={setContactNumber}
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
          >
            <Text style={{ color: dateOfBirth ? "#000" : "#888" }}>
              {dateOfBirth
                ? dateOfBirth.toLocaleDateString()
                : "Select Date of Birth"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.signupButtonText}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => redirect("")}
          style={styles.backButton}
        >
          <ArrowLeft size={23} color="black" style={{ marginRight: 10 }} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mobileInput: {
    flex: 1, // Take remaining space
    backgroundColor: "#f2f2f7",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    marginLeft: 10, // Space between dropdown and input
    fontSize: 17,
  },
  
  countryCodeText: {
    fontSize: 17,
    marginRight: 10,
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
  dropdown: {
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    height:60,
    marginBottom: 1,
  },
  signupButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 0,
  },
  backButton: {
    backgroundColor: "#bdbfc4",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 0,
  },
  backButtonText: {
    color: "black",
    fontSize: 17,
    fontWeight: "600",
  },
  signupButtonText: {
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
