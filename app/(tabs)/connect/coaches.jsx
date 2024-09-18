import React from 'react';
import { Link, router } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const coachesData = [
  { id: 1, name: 'TONY ZINGALE', message: 'Great - talk soon.', image: '', hasNotification: true },
  { id: 2, name: 'CHARLES HALL', message: 'Pls take a look at the...', image: '', hasNotification: true },
  { id: 3, name: 'ROB RICHARDSON', message: "I'd like to watch ...", image: '', hasNotification: false },
  { id: 4, name: 'KEVIN HARRINGTON', message: "I'd like to watch ...", image: '', hasNotification: false },
  { id: 5, name: 'ABBY MCINTURF', message: "That's awesome! ...", image: '', hasNotification: false },
];

export default function Coaches() {
  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerBack}>
              <TouchableOpacity onPress={() => redirect('')}>
                <ArrowLeft style={styles.chevronIcon} size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerText}>COACHES</Text>
            </View>
            <TouchableOpacity onPress={() => router.navigate('/pages/parentProfile')} style={styles.profileContainer}>
              <Text style={styles.profileText}>JASONM</Text>
              <View style={styles.profileImage} />
            </TouchableOpacity>
          </View>
        {/* <Text style={styles.title}>COACHES</Text> */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
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
  title: {
    fontSize: 18,
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
    backgroundColor: '#ccc',
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