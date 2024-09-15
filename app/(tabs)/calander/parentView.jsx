import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';

const ParentView = () => {
  const currentDate = new Date(2023, 11, 6); // December 6, 2023
  const headerHeight = useHeaderHeight();
  
  const renderCalendarDays = () => {
    const days = [];
    for (let i = 27; i <= 31; i++) {
      days.push(<Text key={`prev-${i}`} style={styles.calendarDay}>{i}</Text>);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(
        <Text 
          key={i} 
          style={[
            styles.calendarDay, 
            i === 6 ? styles.selectedDay : null
          ]}
        >
          {i}
        </Text>
      );
    }
    return days;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>TODAY</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>JASONM</Text>
            <View style={styles.profileImage} />
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <Text style={styles.calendarHeader}>DECEMBER 2023</Text>
          <View style={styles.calendarNavigation}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.calendarDays}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <Text key={day} style={styles.calendarDayHeader}>{day}</Text>
            ))}
            {renderCalendarDays()}
          </View>
        </View>

        <View style={styles.eventContainer}>
          <Text style={styles.eventDate}>DECEMBER 6TH</Text>
          <View style={styles.eventCard}>
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
          </View>
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
    padding: 20,
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