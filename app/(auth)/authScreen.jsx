import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>M</Text>
        <Text style={styles.logoSlash}>/</Text>
        <Text style={styles.logoText}>OTIV</Text>
      </View>
      <TouchableOpacity onPress={() => router.navigate('/sign-in')} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate('/sign-up-user-type')} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
  },
  logoSlash: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
    transform: [{ rotate: '20deg' }],
  },
  loginButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#CCCCCC',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
  },
  signupButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});