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
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from "expo-router";
import { useSignupStore } from '../store/signupStore';
import { storeToken } from './authUtils'; 




export default function SignupScreen() {
  const router = useRouter();
  const { signup, loading } = useSignupStore();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null); // Use null as the initial state
  const [open, setOpen] = useState(false); // State for dropdown open/close
  const [items, setItems] = useState([
    { label: 'Select Role', value: null, disabled: true },
    { label: 'Coach', value: 'coach' },
    { label: 'Parent', value: 'parent' },
    { label: 'User', value: 'user' },
  ]);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (!firstname || !lastname || !email || !password || !role) {
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
  
    try {
      const resp = await signup({ firstname, lastname, email, password, role });
      if (!resp.error && resp.token) {

        await storeToken(resp.token); // Store token if signup is successful
        
        
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => router.navigate("/home") },
        ]);
      
      } else {
        setError(resp.message || 'An unexpected error occurred');
      }
    } catch (error) {
      if (error.response) {
        const errorData = await error.response.json();
        if (errorData.errors) {
          setError(errorData.errors.join(", "));
        } else {
          setError(errorData.error || 'An unexpected error occurred');
        }
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Signup error:', error);
    }
  };
  

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Sign Up</Text>
    
          <View style={styles.inputContainer}>
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
            <View style={styles.dropdownContainer}>
              <DropDownPicker
                open={open}
                value={role}
                items={items}
                setOpen={setOpen}
                setValue={setRole}
                setItems={setItems}
                placeholder="Select Role"
                style={styles.dropdown}
                zIndex={9999}
              />
            </View>
          </View>
    
          {/* Display error below inputs */}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {true && <Text style={styles.errorText}>This is an error message!</Text>}

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
            <Text style={styles.signupButtonText}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Text>
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
  dropdownContainer: {
    zIndex: 9999, // Set a high zIndex to ensure it appears above other components
  },
  dropdown: {
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
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
