import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileCreation() {
  const router = useRouter();
  const [acceptTerms, setAcceptTerms] = useState(false);

  const refirect = (url) => {
    if (url == '') {
        router.back();
    } else {
        router.navigate(url);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => refirect('')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.title}>CREATE AN ACCOUNT</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>FIRST NAME</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter First Name"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>LAST NAME</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Last Name"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NAME OF SCHOOL</Text>
          <TouchableOpacity style={styles.inputWrapper}>
            <Text style={styles.placeholderText}>Search for Name of Your School</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
          </View>
        </View>
        
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            {acceptTerms && <View style={styles.checkboxInner} />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Accept the <Text style={styles.termsLink}>Terms & Conditions</Text>
          </Text>
        </View>
        
        <Text style={styles.loginText}>
          Already have an account? <Text onPress={() => refirect('/sign-in')} style={styles.loginLink}>Log In</Text>
        </Text>
        
        <TouchableOpacity onPress={() => refirect('/student/accountCreation')} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    padding: 20,
    fontSize: 16,
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: '#999',
    paddingVertical: 15,
  },
  dropdownIcon: {
    marginLeft: 'auto',
    fontSize: 16,
    color: '#999',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
  },
  termsText: {
    fontSize: 14,
  },
  termsLink: {
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  loginLink: {
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});