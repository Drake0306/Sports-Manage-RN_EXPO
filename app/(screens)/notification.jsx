import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

export default function Home() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.footer}>
          <View style={styles.coachInfo}>
            <Image source={{ uri: '/placeholder.svg?height=24&width=24' }} style={styles.coachIcon} />
            <Text style={styles.coachName}>COACH TONY</Text>
          </View>
          <Text style={styles.coachMessage}>
            Hey Sharks, we should definitely invest in Motiv - they gave a great pitch today!
          </Text>
          <Text style={styles.timestamp}>10/6/23 3:33PM</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#000',
  },
  profileIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 8,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: 'black'
  },
  profileName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
  },
  athleteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  athleteImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginRight: 16,
    backgroundColor: 'black'
  },
  athleteInfo: {
    flex: 1,
  },
  athleteName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  schoolInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schoolLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  schoolName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  sports: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: '#666',
  },
  footer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  coachInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  coachIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  coachName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  coachMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  timestamp: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666',
  },
});