import Notifications from '@/app/components/notifications';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const athletes = [
  {
    id: 1,
    name: 'JADEN WALTON',
    school: 'LOVELAND HIGH SCHOOL',
    sports: 'Basketball | Football',
    image: 'https://example.com/jaden.jpg',
    logo: 'https://example.com/loveland-logo.png',
  },
  {
    id: 2,
    name: 'NOELLE SCHEPER',
    school: 'WALNUT HILLS HIGH SCHOOL',
    sports: 'Soccer | Softball',
    image: 'https://example.com/noelle.jpg',
    logo: 'https://example.com/walnut-hills-logo.png',
  },
];

export default function AthletesList() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ATHLETES</Text>
          <TouchableOpacity onPress={() => router.navigate('/pages/parentProfile')} style={styles.profileContainer}>
            <Text style={styles.profileText}>JASONM</Text>
            <View style={styles.profileImage} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {athletes.map((athlete) => (
            <View key={athlete.id} style={styles.card}>
              <Image source={{ uri: athlete.image }} style={styles.athleteImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{athlete.name}</Text>
                <View style={styles.schoolContainer}>
                  <Image source={{ uri: athlete.logo }} style={styles.schoolLogo} />
                  <View>
                    <Text style={styles.schoolName}>{athlete.school}</Text>
                    <Text style={styles.sports}>{athlete.sports}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <Notifications />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  card: {
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    padding: 13,
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
  athleteImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  schoolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schoolLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  schoolName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  sports: {
    fontSize: 11,
    color: '#666',
  },
});