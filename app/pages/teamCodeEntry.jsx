import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from "expo-router";

export default function TeamCodeEntry() {

const redirect = (url) => {
    if(url === ''){
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
        
        <View style={styles.logoContainer}>
            <Text style={styles.logo}>
            <Text style={styles.logoM}>M</Text>
            <Text style={styles.logoLightning}>{'/'}</Text>
            <Text style={styles.logoOtiv}>otiv</Text>
            </Text>
        </View>
        
        <Text style={styles.enterCodeText}>ENTER TEAM CODE</Text>
        
        <View style={styles.codeInputContainer}>
            <TextInput style={styles.codeInput} />
            <TextInput style={styles.codeInput} />
            <TextInput style={styles.codeInput} />
            <TextInput style={styles.codeInput} />
            <TextInput style={styles.codeInput} />
            <TextInput style={styles.codeInput} />
        </View>
        
        <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
        
        <Text style={styles.contactText}>
            Don't have one?
        </Text>
        <Text style={styles.contactText}>
        Please contact the head coach directly.
        </Text>
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
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 50,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  logoM: {
    transform: [{ skewX: '-15deg' }],
  },
  logoLightning: {
    fontSize: 60,
    position: 'absolute',
    top: -10,
    left: 30,
    transform: [{ rotate: '15deg' }],
  },
  logoOtiv: {
    marginLeft: -5,
  },
  enterCodeText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginTop: 20,
  },
  codeInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    width: '10%',
    fontSize: 40,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
  },
});