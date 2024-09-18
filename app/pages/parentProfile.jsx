import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ParentProfile() {
  const Redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>  
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => Redirect('')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://v0.dev/placeholder.svg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.userName}>JASON MOORE</Text>
          <TouchableOpacity onPress={() => Redirect('/pages/userEditProfile')} style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ATHLETES</Text>
            <TouchableOpacity>
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.athleteItem}>
            <Image
              source={{ uri: 'https://v0.dev/placeholder.svg' }}
              style={styles.athleteImage}
            />
            <Text style={styles.athleteName}>JADEN WALTON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.athleteItem}>
            <Image
              source={{ uri: 'https://v0.dev/placeholder.svg' }}
              style={styles.athleteImage}
            />
            <Text style={styles.athleteName}>NOELLE SCHEPER</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="bug" size={24} color="black" />
          <Text style={styles.optionText}>Report a bug</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="bulb" size={24} color="black" />
          <Text style={styles.optionText}>Submit a feature request</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.textButton}>
          <Text style={styles.textButtonText}>Change password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => Redirect('/(auth)/sign-in')} style={styles.textButton}>
          <Text style={[styles.textButtonText, styles.logoutText]}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  editImageButton: {
    position: 'absolute',
    right: 150,
    bottom: 100,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  editProfileButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 16,
  },
  editProfileText: {
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  athleteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  athleteImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  athleteName: {
    fontSize: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
  },
  textButton: {
    alignItems: 'center',
    marginVertical: 8,
  },
  textButtonText: {
    fontSize: 16,
  },
  logoutText: {
    color: 'red',
  },
});