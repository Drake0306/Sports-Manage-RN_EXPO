import Notifications from '@/app/components/notifications';
import React,{useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { retrieveToken } from './../../(auth)/authUtils'; // Adjust the import based on your structure

export default function AthletesList() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}} >
            Comming Soon
        </Text>
      </View>
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