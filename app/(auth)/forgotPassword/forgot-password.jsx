import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const refirect = (url) => {
    if (url == '') {
        router.back();
    } else {
        router.navigate(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => refirect('')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>FORGOT YOUR PASSWORD?</Text>
        
        <Text style={styles.description}>
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </Text>
        
        <Text style={styles.label}>EMAIL</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <TouchableOpacity style={styles.continueButton} onPress={() => refirect('/forgotPassword/check-email')}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
        
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 24,
  },
  inputIcon: {
    padding: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 16,
    color: 'gray',
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});