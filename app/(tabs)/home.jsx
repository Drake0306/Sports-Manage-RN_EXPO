import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Link, router } from "expo-router";

const AthleteCard = ({ name, school, sports, imageUrl, logoUrl }) => (
  <View style={styles.athleteCard}>
    <Image source={{ uri: imageUrl }} style={styles.athleteImage} />
    <View style={styles.athleteInfo}>
      <Text style={styles.athleteName}>{name}</Text>
      <View style={styles.schoolInfo}>
        <Image source={{ uri: logoUrl }} style={styles.schoolLogo} />
        <View>
          <Text style={styles.schoolName}>{school}</Text>
          <Text style={styles.sports}>{sports}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default function Home() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const redirect = (url) => {
    router.replace(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.header}onPress={() => redirect('/(screens)/parentSettings')}>
          <Text style={styles.title}>ATHLETES</Text>
          <View style={styles.profileIcon}>
            <Text style={styles.profileName}>JASONM &nbsp;&nbsp;</Text>
            <Image 
              source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-11%20at%2011.39.14%E2%80%AFPM-Iyguck5eKXLsgftCzNPoXJxke25PaQ.png' }} 
              style={styles.profileImage} 
            />
          </View>
        </TouchableOpacity>

        <AthleteCard
          name="JADEN WALTON"
          school="LOVELAND HIGH SCHOOL"
          sports="Basketball | Football"
          imageUrl="/placeholder.svg?height=60&width=60"
          logoUrl="/placeholder.svg?height=24&width=24"
        />

        <AthleteCard
          name="NOELLE SCHEPER"
          school="WALNUT HILLS HIGH SCHOOL"
          sports="Soccer | Softball"
          imageUrl="/placeholder.svg?height=60&width=60"
          logoUrl="/placeholder.svg?height=24&width=24"
        />

        {/* <View style={styles.footer}>
          <View style={styles.coachInfo}>
            <Image source={{ uri: '/placeholder.svg?height=24&width=24' }} style={styles.coachIcon} />
            <Text style={styles.coachName}>COACH TONY</Text>
          </View>
          <Text style={styles.coachMessage}>
            Hey Sharks, we should definitely invest in Motiv - they gave a great pitch today!
          </Text>
          <Text style={styles.timestamp}>10/6/23 3:33PM</Text>
        </View> */}
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
    paddingHorizontal: 16,
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