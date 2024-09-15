import React from 'react';
import { Link, router } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import { ArrowLeft, Search } from 'lucide-react-native';

const coachesData = [
  { id: 1, name: 'TONY ZINGALE', message: 'Great - talk soon.', image: '', hasNotification: true },
  { id: 2, name: 'CHARLES HALL', message: 'Pls take a look at the...', image: '', hasNotification: true },
  { id: 3, name: 'ROB RICHARDSON', message: "I'd like to watch ...", image: '', hasNotification: false },
  { id: 4, name: 'KEVIN HARRINGTON', message: "I'd like to watch ...", image: '', hasNotification: false },
  { id: 5, name: 'ABBY MCINTURF', message: "That's awesome! ...", image: '', hasNotification: false },
];

export default function Coaches() {
  const redirect = (url) => {
    router.navigate(url);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Search color="#000" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Image source={{ uri: '' }} style={styles.profileImage} />
          <Text style={styles.profileText}>JASONM</Text>
        </TouchableOpacity> */}
      </View>
      <Text style={styles.title}>COACHES</Text>
      <ScrollView style={styles.scrollView}>
        {coachesData.map((coach) => (
          <TouchableOpacity
            onPress={() => redirect('/pages/chat')}
            key={coach.id}
            style={[
              styles.coachCard,
              coach.hasNotification && styles.notificationCard
            ]}
          >
            <Image source={{ uri: coach.image }} style={styles.coachImage} />
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{coach.name}</Text>
              <Text style={styles.coachMessage}>{coach.message}</Text>
            </View>
            {coach.hasNotification && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: 'black'
  },
  profileText: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 16,
  },
  titleBody: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#000',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationCard: {
    backgroundColor: '#FFE4E1',
  },
  coachImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  coachMessage: {
    color: '#666',
  },
  profileIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 8,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6347',
    position: 'absolute',
    top: 12,
    right: 12,
  },
});