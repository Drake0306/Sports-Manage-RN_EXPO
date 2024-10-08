import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Alert() {
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
        <Text style={styles.title}>PASSWORD CHANGED</Text>
        <Text style={styles.message}>
            Your password has been changed successfully!
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => redirect('sign-in-global')}>
            <Text style={styles.buttonText}>BACK TO LOGIN</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});