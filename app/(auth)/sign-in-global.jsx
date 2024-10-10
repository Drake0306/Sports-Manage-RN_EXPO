import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SignInGlobal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <View style={styles.logoContainer}>
            <Svg width={150} height={60} viewBox="0 0 150 60">
            <Path
                d="M30 10 L60 10 L75 50 L90 10 L120 10 M0 30 L150 30"
                fill="none"
                stroke="black"
                strokeWidth="10"
            />
            </Svg>
            <Text style={styles.logoText}>MOTIV</Text>
        </View>

        <Text style={styles.label}>EMAIL</Text>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            />
        </View>

        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="black" />
            </TouchableOpacity>
        </View>

        <View style={styles.rememberForgotContainer}>
            <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberPassword(!rememberPassword)}
            >
            <View style={[styles.checkbox, rememberPassword && styles.checked]} />
            <Text style={styles.checkboxLabel}>Remember Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refirect('/forgotPassword/forgot-password')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.signUpText}>
            Don't have an account? <TouchableOpacity onPress={() => refirect('/sign-up-user-type')}><Text style={styles.signUpLink}>Sign Up Now</Text></TouchableOpacity>
        </Text>

        <TouchableOpacity style={styles.loginButton} onPress={() => refirect('/home')}>
            <Text style={styles.loginButtonText}>LOG IN</Text>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'black',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#888',
  },
  signUpText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  signUpLink: {
    color: 'black',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 15,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});