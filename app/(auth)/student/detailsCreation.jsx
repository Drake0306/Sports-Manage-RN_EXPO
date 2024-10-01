import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DetailsCreation() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [parentPhone, setParentPhone] = useState('');

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