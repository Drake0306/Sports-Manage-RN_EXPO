import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AccountCreation() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const refirect = (url) => {
    if (url == '') {
        router.back();
    } else {
        router.navigate(url);
    }
  };


  const handleContinue = async () => {
    // Validation for username and password
    if (!username) {
      Alert.alert('Validation Error', 'Username cannot be empty');
      return;
    }

    if (!password) {
      Alert.alert('Validation Error', 'Password cannot be empty');
      return;
    }

    // Password criteria: minimum 6 characters
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long');
      return;
    }

    // Store data in AsyncStorage
    const userData = {
      username,
      password
      
    };

    try {
      const existingData = await AsyncStorage.getItem('userData');
      const previousData = existingData ? JSON.parse(existingData) : {};
      const newUserData = { ...previousData, ...userData };
      await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
      // Redirect to the next screen
      refirect('/coach/detailsCreation');
    } catch (error) {
      console.error('Error storing user data', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <TouchableOpacity onPress={() => refirect('')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.title}>CREATE USERNAME &{'\n'}PASSWORD</Text>
        
        <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
            <Ionicons name="person-outline" size={40} color="gray" />
            </View>
            <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={20} color="black" />
            </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CREATE USERNAME</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter User Name"
            value={username}
            onChangeText={setUsername}
            />
        </View>
        
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CREATE PASSWORD</Text>
            <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder="Enter Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
            </View>
        </View>
        
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
            <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder="Enter Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
            </View>
        </View>
        
        <TouchableOpacity onPress={() => refirect('/student/detailsCreation')} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>CONTINUE</Text>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    right: 110,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 20,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});