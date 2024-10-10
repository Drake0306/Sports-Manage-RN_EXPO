import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserEditProfile() {
  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => redirect('')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.title}>EDIT PROFILE</Text>
        
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "/placeholder.svg?height=100&width=100" }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="pencil" size={16} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>FIRST NAME</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Rob"
              placeholderTextColor="black"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>LAST NAME</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Richardson"
              placeholderTextColor="black"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>USERNAME</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="at-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="RobRich"
              placeholderTextColor="black"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL*</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="robrich@gmail.com"
              placeholderTextColor="black"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="512-122-1244"
              placeholderTextColor="black"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>TYPE OF COACH</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="black"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => redirect('')}>
            <Text style={styles.cancelButtonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.submitButton]}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgray',
  },
  editImageButton: {
    position: 'absolute',
    right: 130,
    bottom: 0,
    backgroundColor: 'black',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 5,
    borderRadius: 10,
    borderColor: 'grey', // Border color
    borderWidth: 1,       // Border width to make it visible
    padding: 10,
  },
  inputContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    display: 'flex',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: 'black',
  },
  button: {
    width: '48%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});