import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CalendarComponent from '../../components/calander/calendarComponent';
import ShrinkableTrainingCard from '../../components/shrinkableBtn/shrinkableTrainingCard';

// Sample event data
const eventsData = {
  '2024-10-05': ['Event 1', 'Event 2', 'Event 3'],
  '2024-10-10': ['Event 4'],
  '2024-10-15': ['Event 5', 'Event 6'],
  // Add more events as needed
};

const CoachView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const redirect = (url) => {
    if (url === '') {
      router.back();
    } else {
      router.navigate(url);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    // Set the selected date to the current date on component mount
    const currentDate = new Date();
    setSelectedDate(currentDate);
    
    // Format the current date to a string for events lookup
    const formattedDate = currentDate.toISOString().split('T')[0];
    const currentEvents = eventsData[formattedDate] || [];
    setEvents(currentEvents);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Update events whenever the selected date changes
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const currentEvents = eventsData[formattedDate] || [];
    setEvents(currentEvents);
  }, [selectedDate]); // Runs whenever selectedDate changes

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ATHLETES</Text>
          <TouchableOpacity onPress={() => router.navigate('/pages/userProfile')} style={styles.profileContainer}>
            <Text style={styles.profileText}>JASONM</Text>
            <View style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        <CalendarComponent onDateChange={handleDateChange} />

        <View style={styles.eventContainer}>
          <Text style={styles.eventDate}>
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </Text>

          {events.length > 0 ? (
            events.map((event, index) => (
              <ShrinkableTrainingCard key={index} eventName={event} />
            ))
          ) : (
            <Text style={styles.noEventsText}>No events for this date.</Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.navigate('/pages/addEvent')}>
        <Ionicons name="add" size={40} color="black" />
      </TouchableOpacity>
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
  eventContainer: {
    padding: 10,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noEventsText: {
    fontSize: 14,
    color: 'gray',
  },
  scrollContent: {
    padding: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default CoachView;
