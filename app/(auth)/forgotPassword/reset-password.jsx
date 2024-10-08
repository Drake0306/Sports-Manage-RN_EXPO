import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function PasswordReset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordValid = (pass) => {
    // Basic strong password check (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(pass);
  };

  const passwordsMatch = password === confirmPassword && password !== '';

  const redirect = (url) => {
    if (url == '') {
        router.back();
    } else {
        router.navigate(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => redirect('')}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>RESET PASSWORD</Text>
        <Text style={styles.subtitle}>Please type something you'll remember</Text>

        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>NEW PASSWORD</Text>
            <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                placeholder="Must be 8 characters"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                <Ionicons 
                name={isPasswordValid(password) ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={isPasswordValid(password) ? "green" : "red"} 
                />
            </TouchableOpacity>
            </View>
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CONFIRM NEW PASSWORD</Text>
            <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                placeholder="Must be 8 characters"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.icon}>
                <Ionicons 
                name={passwordsMatch ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={passwordsMatch ? "green" : "red"} 
                />
            </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity 
            style={[styles.resetButton, (!isPasswordValid(password) || !passwordsMatch) && styles.disabledButton]} 
            disabled={!isPasswordValid(password) || !passwordsMatch}
            onPress={() => redirect('forgotPassword/alert')}
        >
            <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  },
  resetButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});