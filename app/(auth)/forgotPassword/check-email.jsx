import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CheckEmail() {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(20);
  const inputRefs = useRef([]);

  const refirect = (url) => {
    if (url == '') {
        router.back();
    } else {
        router.navigate(url);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    console.log('Verifying code:', enteredCode);

    refirect('forgotPassword/reset-password');
    // Add your verification logic here
  };

  const handleResendCode = () => {
    setTimer(20);
    // Add your code resend logic here
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => refirect('')}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>PLEASE CHECK YOUR EMAIL</Text>
        <Text style={styles.subtitle}>We've sent a code to helloworld@gmail.com</Text>
        <View style={styles.codeContainer}>
            {code.map((digit, index) => (
            <TextInput
                key={index}
                style={styles.codeInput}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
            />
            ))}
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
            <Text style={styles.resendText}>
            Send code again {timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : ''}
            </Text>
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
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    textAlign: 'center',
    color: 'gray',
  },
});