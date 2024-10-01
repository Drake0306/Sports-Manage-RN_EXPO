import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ChevronLeft, ChevronDown, Info } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DetailsCreation() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState('');
  const [athleteCode, setAthleteCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = () => {
    const newCode = [...athleteCode];
    newCode[index] = text;
    setAthleteCode(newCode);
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
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => refirect('')} style={styles.backButton}>
                <Ionicons name="arrow-back" color="black" size={24} />
            </TouchableOpacity>
            
            <Text style={styles.title}>SYNCH WITH ATHLETE</Text>
            
            <Text style={styles.label}>NAME OF SCHOOL</Text>
            <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                {schoolName || 'Search for Name of Your School'}
                </Text>
                <ChevronDown color="gray" size={24} />
            </TouchableOpacity>
            
            <Text style={styles.label}>ENTER YOUR ATHLETE'S CODE</Text>
            <View style={styles.codeInputContainer}>
                {athleteCode.map((code, index) => (
                <TextInput
                    key={index}
                    style={styles.codeInput}
                    value={code}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    maxLength={1}
                    keyboardType="number-pad"
                />
                ))}
            </View>
            
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>LOG IN</Text>
            </TouchableOpacity>
            
            <Text style={styles.helperText}>
                Didn't receive a code?{'\n'}
                Please contact your student or their coach directly.
            </Text>
            
            <View style={styles.infoContainer}>
                <Info color="black" size={24} />
                <Text style={styles.infoText}>
                Where to find your athlete's code:{'\n'}
                1. Check your email or SMS inbox, including spam{'\n'}
                2. Ask your student to send you a new code via their profile settings
                </Text>
            </View>
            </ScrollView>
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
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 20,
    marginBottom: 30,
  },
  dropdownText: {
    color: 'gray',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  codeInput: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helperText: {
    textAlign: 'center',
    marginBottom: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    marginLeft: 10,
    flex: 1,
  },
});