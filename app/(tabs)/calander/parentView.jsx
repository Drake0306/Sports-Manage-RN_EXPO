import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import CalendarComponent from '../../components/calander/calendarComponent';
import ShrinkableTrainingCard from '../../components/shrinkableBtn/shrinkableTrainingCard';
import { router } from 'expo-router';

const ParentView = () => {
  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ATHLETES</Text>
          <TouchableOpacity onPress={() => router.navigate('/pages/parentProfile')} style={styles.profileContainer}>
            <Text style={styles.profileText}>JASONM</Text>
            <View style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        <CalendarComponent />

        <View style={styles.eventContainer}>
          <Text style={styles.eventDate}>DECEMBER 6TH</Text>

          <ShrinkableTrainingCard />
          <ShrinkableTrainingCard />
          <ShrinkableTrainingCard />


          {/* <View style={styles.eventCard}>
            <View style={styles.eventTime}>
              <Text style={styles.eventTimeText}>05:30 PM</Text>
              <Text style={styles.eventTimeText}>07:00 PM</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>WEIGHT TRAINING</Text>
              <Text style={styles.eventLocation}>Loveland HS Weight Room</Text>
            </View>
            <View style={styles.eventStatus}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            </View>
            <TouchableOpacity style={styles.eventOptions}>
              <Ionicons name="ellipsis-vertical" size={24} color="#000" />
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
  calendarContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  calendarHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDayHeader: {
    width: '14.28%',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
    color: '#666',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#FF6B6B',
    color: '#fff',
    borderRadius: 20,
  },
  eventContainer: {
    padding: 10,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
  },
  eventTime: {
    marginRight: 15,
  },
  eventTimeText: {
    fontSize: 12,
    color: '#666',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventLocation: {
    fontSize: 12,
    color: '#666',
  },
  eventStatus: {
    marginRight: 10,
  },
  eventOptions: {
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 16,
  },
});

export default ParentView;