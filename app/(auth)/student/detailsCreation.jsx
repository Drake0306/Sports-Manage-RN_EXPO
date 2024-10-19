import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsCreation() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [parentPhone, setParentPhone] = useState('');

    const validateInputs = () => {
      let valid = true;
      let newErrors = {};
      

      // TOTO 
      if (!dateOfBirth) {
        newErrors.dateOfBirth = "Date of Birth is required";
        valid = false;
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    const handleRegister = async () => {
      setError(""); // Clear any existing error
  
      // Validate inputs and get the result
      const isValid = validateInputs();
  
      // If inputs are not valid, alert the errors and return
      if (!isValid) {
        // Show validation errors as alerts
        for (const [key, value] of Object.entries(errors)) {
          Alert.alert("Validation Error", value, [{ text: "OK" }]);
        }
        return; // Stop execution if validation fails
      }
  
      const formattedDOB = dateOfBirth.toISOString().split("T")[0]; // Format date if needed
      setCoachtype(selectedCoachType.type); // Set the coach type state
      setOrganization(selectedOrganization.name);
  
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue !== null) {
          const userData = JSON.parse(jsonValue);
          const { email, firstName, lastName, password, phoneNumber, username } =
            userData;
          try {
            const resp = await signup({
              firstname: firstName.trim(),
              lastname: lastName.trim(),
              email: email.trim(),
              password: password.trim(),
              role: "coach",
              username: username.trim(),
              phoneNumber: `+91${phoneNumber.trim()}`,
              dateOfBirth: formattedDOB,
              coachType: selectedCoachType.id,
              organization: selectedOrganization.id,
            });
  
            if (resp && !resp.error && resp.token) {
              const otpResp = await sendOtp(`+91${phoneNumber.trim()}`);
              await AsyncStorage.setItem("@phone", `+91${phoneNumber.trim()}`);
  
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
                Alert.alert("Error", otpResp.message || "Failed to send OTP", [
                  { text: "OK" },
                ]);
              }
            } else {
              Alert.alert(
                "Error",
                resp?.message || "An unexpected error occurred",
                [{ text: "OK" }]
              );
            }
          } catch (error) {
            Alert.alert(
              "Error",
              error.message || "An unexpected error occurred",
              [{ text: "OK" }]
            );
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to fetch user data", [{ text: "OK" }]);
      }
    };

    const refirect = (url) => {
        if (url == '') {
            router.back();
        } else {
            router.navigate(url);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => refirect('')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.title}>ADD YOUR DETAILS</Text>
        
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>PHONE NUMBER</Text>
            <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            </View>
        </View>
        
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>DATE OF BIRTH</Text>
            <View style={styles.inputWrapper}>
            <Ionicons name="calendar-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                keyboardType="numeric"
            />
            </View>
        </View>
        
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>PARENT/GUARDIAN CONTACT</Text>
            <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Enter Email Address"
                value={parentEmail}
                onChangeText={setParentEmail}
                keyboardType="email-address"
            />
            </View>
            <View style={[styles.inputWrapper, { marginTop: 10 }]}>
            <Ionicons name="call-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                value={parentPhone}
                onChangeText={setParentPhone}
                keyboardType="phone-pad"
            />
            </View>
        </View>
        
        <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});