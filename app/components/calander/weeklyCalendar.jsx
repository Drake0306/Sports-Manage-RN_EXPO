import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';

const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment(new Date())); // September 18, 2024
  const scrollViewRef = useRef(null);

  const getDaysOfWeek = (date) => {
    const start = moment(date).startOf('week'); // Start from Sunday or customize to Monday
    return Array(7).fill().map((_, i) => start.clone().add(i, 'days'));
  };

  const weekDays = getDaysOfWeek(currentDate);

  const hasEvent = (date) => {
    // Mock event check - replace with your actual event checking logic
    return [3, 5, 6].includes(date.day());
  };

  const onDayPress = (date) => {
    console.log(`Events for ${date.format('dddd, MMMM Do YYYY')}`);
    setCurrentDate(date); // Update the current date to the selected date
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {currentDate.format('MMMM Do YYYY').toUpperCase()}
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
      >
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              day.isSame(currentDate, 'day') ? styles.currentDay : null
            ]}
            onPress={() => onDayPress(day)}
          >
            <Text style={styles.dayNumber}>{day.date()}</Text>
            <Text style={styles.dayName}>
              {day.format('ddd')}
            </Text>
            {hasEvent(day) ? <View style={styles.eventDot} /> : <View style={styles.whiteDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingRight: 20,
  },
  dayContainer: {
    width: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
    opacity: 0.5,
  },
  currentDay: {
    backgroundColor: '#e0e0e0',
    opacity: 1,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayName: {
    fontSize: 14,
    color: '#666',
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'red',
    marginTop: 4,
  },
  whiteDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#ffffff00',
    marginTop: 4,
  },
});

export default WeeklyCalendar;
