import React from 'react';
import { Link, router } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_700Bold, Inter_600SemiBold } from '@expo-google-fonts/inter';

const redirect = (url) => {
  router.replace(url);
};
const SportButton = ({ icon, sport, link }) => (
  <TouchableOpacity onPress={() => redirect(link)} style={styles.sportButton}>
    <View style={styles.sportIconContainer}>{icon}</View>
    <Text style={styles.sportText}>{sport}</Text>
    {/* <ChevronRight style={styles.chevronIcon} size={24} color="#000" /> */}
  </TouchableOpacity>
);

const AthleteSection = ({ name, sports }) => (
  <View style={styles.athleteSection}>
    <Text style={styles.athleteName}>{name}</Text>
    {sports.map((sport, index) => (
      <SportButton key={index} icon={sport.icon} link={sport.link} sport={sport.name} />
    ))}
  </View>
);

const Communication = () => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const jadenSports = [
    { name: 'BASKETBALL',link: '/(screens)/coaches', icon: ""},
    { name: 'FOOTBALL',link: '/(screens)/coaches', icon: "" },
  ];

  const noelleSports = [
    { name: 'SOCCER',link: '/(screens)/coaches', icon: "" },
    { name: 'SOFTBALL',link: '/(screens)/coaches', icon: "" },
  ];
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>JASONM</Text>
          <Image 
            source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-11%20at%2011.43.53%E2%80%AFPM-hhB8T77FmXGBatfFJIgzSjGtfBkl9e.png' }} 
            style={styles.profileImage} 
          />
        </View> */}
        <View style={styles.header}>
          <Text style={styles.title}>ATHLETES</Text>
          <View style={styles.profileIcon}>
            <Text style={styles.profileName}>JASONM &nbsp;&nbsp;</Text>
            <Image 
              source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-11%20at%2011.39.14%E2%80%AFPM-Iyguck5eKXLsgftCzNPoXJxke25PaQ.png' }} 
              style={styles.profileImage} 
            />
          </View>
        </View>
        <AthleteSection name="JADEN" sports={jadenSports} />
        <AthleteSection name="NOELLE" sports={noelleSports} />
      </ScrollView>
    </SafeAreaView>
  );
};

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
  profileName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
  },
  headerText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginRight: 10,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: 'black'
  },
  athleteSection: {
    marginBottom: 20,
  },
  athleteName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    marginBottom: 10,
  },
  sportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sportIconContainer: {
    marginRight: 15,
  },
  sportText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    flex: 1,
  },
  chevronIcon: {
    opacity: 0.3,
  },
});

export default Communication;