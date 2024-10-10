import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileCreation() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
          <Text style={styles.inputLabel}>FIRST NAME</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>LAST NAME</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>EMAIL</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </View>
        
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
        
        <TouchableOpacity 
          style={styles.termsContainer} 
          onPress={() => setAcceptTerms(!acceptTerms)}
        >
          <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
            {acceptTerms && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
          <Text style={styles.termsText}>Accept the Terms & Conditions</Text>
        </TouchableOpacity>
        
        <Text style={styles.loginText}>
          Already have an account? <Text onPress={() => refirect('/sign-in')} style={styles.loginLink}>Log In</Text>
        </Text>
        
        <TouchableOpacity onPress={() => refirect('/coach/accountCreation')} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'black',
  },
  termsText: {
    fontSize: 14,
    color: '#333',
  },
  loginText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
    color: '#333',
  },
  loginLink: {
    fontWeight: 'bold',
    color: 'black',
  },
  continueButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});