import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from "expo-router";

const Person = ({ name, message, isHighlighted = false }) => (
  <TouchableOpacity onPress={() => redirect('/pages/chat')} style={[styles.personContainer, isHighlighted && styles.highlightedContainer]}>
    <View style={styles.avatarContainer}>
      <Ionicons name="person-circle-outline" size={40} color="#888" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
    {isHighlighted && <View style={styles.dot} />}
  </TouchableOpacity>
);

const Section = ({ title, data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {data.map((person, index) => (
      <Person key={index} {...person} />
    ))}
  </View>
);

const redirect = (url) => {
  if(url === ''){
    router.back();
  } else {
    router.navigate(url);
  }
};

export default function coachView() {
  const coaches = [
    { name: 'ABBY MCINTURF', message: "That's awesome! ..." },
    { name: 'TONY ZINGALE', message: 'Great - talk soon.', isHighlighted: true },
  ];

  const athletes = [
    { name: 'JADEN WALTON', message: 'Pls take a look at the...', isHighlighted: true },
    { name: 'ROB RICHARDSON', message: "I'd like to watch ..." },
    { name: 'KEVIN HARRINGTON', message: "I'd like to watch ..." },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ATHLETES</Text>
        <TouchableOpacity onPress={() => router.navigate('/pages/userProfile')} style={styles.profileContainer}>
          <Text style={styles.profileText}>JASONM</Text>
          <View style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerHeader}>
        <ScrollView>
          <Section title="COACHES" data={coaches} />
          <Section title="ATHLETES" data={athletes} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerHeader: {
    padding: 20,
    paddingTop: 40,
  }, 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    marginRight: 10,
    fontSize: 14,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  }, 
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  highlightedContainer: {
    backgroundColor: '#FFE4E1',
  },
  avatarContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#666',
    fontSize: 14,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -4,
  },
});