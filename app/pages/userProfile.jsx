import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function UserProfile() {
  const Redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Redirect('')}>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
      </View>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://example.com/profile-image.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>ROB RICHARDSON</Text>
          <Text style={styles.team}>LOVELAND TIGERS</Text>
          <Text style={styles.role}>FOOTBALL HEAD COACH</Text>
        </View>
        
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>"Mind sharper than a needle kit!" 🧠🪡</Text>
          <Text style={styles.quote}>Coach RR 🏈</Text>
        </View>
        
        <TouchableOpacity style={styles.editButton} onPress={() => Redirect('/pages/userEditProfile')}>
          <Text style={styles.editButtonText}>EDIT PROFILE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>🐞 Report a bug</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>💡 Submit a feature request</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.changePassword}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Redirect('/(auth)/sign-in')}>
            <Text style={styles.logOut}>Log out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'red',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  team: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    color: 'gray',
  },
  quoteContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  quote: {
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#eee',
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
  editButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  optionButton: {
    padding: 15,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionButtonText: {
    fontSize: 16,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  changePassword: {
    fontSize: 16,
    marginBottom: 10,
  },
  logOut: {
    fontSize: 16,
    color: 'red',
  },
});