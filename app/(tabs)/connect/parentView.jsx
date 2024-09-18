import React from 'react';
import { Link, router } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { Inter_700Bold, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { ChevronRight } from 'lucide-react-native';

const redirect = (url) => {
  if(url === ''){
    router.back();
  } else {
    router.navigate(url);
  }
};
const SportButton = ({ icon, sport, link }) => (
  <TouchableOpacity onPress={() => redirect(link)} style={styles.sportButton}>
    <View style={styles.sportIconContainer}>{icon}</View>
    <Text style={styles.sportText}>{sport}</Text>
    <ChevronRight style={styles.chevronIcon} size={24} color="black" />
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

const ParentView = () => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const jadenSports = [
    { name: 'BASKETBALL',link: '/(tabs)/connect/coaches', icon: ""},
    { name: 'FOOTBALL',link: '/(tabs)/connect/coaches', icon: "" },
  ];

  const noelleSports = [
    { name: 'SOCCER',link: '/(tabs)/connect/coaches', icon: "" },
    { name: 'SOFTBALL',link: '/(tabs)/connect/coaches', icon: "" },
  ];
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ATHLETES</Text>
          <TouchableOpacity onPress={() => router.navigate('/pages/parentProfile')} style={styles.profileContainer}>
            <Text style={styles.profileText}>JASONM</Text>
            <View style={styles.profileImage} />
          </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#000',
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
  athleteSection: {
    marginBottom: 20,
    marginTop: 30,
  },
  athleteName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    marginBottom: 10,
  },
  sportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 25,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 12,
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
    opacity: 1,
  },
});

export default ParentView;