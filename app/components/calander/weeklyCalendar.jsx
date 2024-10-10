import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

const WeeklyCalendar = ({ onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(moment(new Date()));
  const [events, setEvents] = useState([]);
  const scrollViewRef = useRef(null);
  
  
  useEffect(() => {
    // Request calendar permission and fetch events
    const fetchCalendarEvents = async () => {
      try {
        const permission = await CalendarEvents.requestPermissions();
        
        if (permission === 'authorized') {
          // Fetch events for the current week
          const startDate = currentDate.clone().startOf('week').toISOString();
          const endDate = currentDate.clone().endOf('week').toISOString();
          
          const fetchedEvents = await CalendarEvents.fetchAllEvents(startDate, endDate);
          
          // Format the events
          const formattedEvents = fetchedEvents.map(event => ({
            date: moment(event.startDate).format('YYYY-MM-DD'), // Ensure date format is correct
            title: event.title,
          }));

          setEvents(formattedEvents);
        } else {
          console.log('Calendar permission denied');
        }
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      }
    };

    fetchCalendarEvents();
  }, [currentDate]); // Re-fetch events if currentDate changes

  const getDaysOfWeek = (date) => {
    const start = moment(date).startOf('week'); // Start from Sunday or customize to Monday
    return Array(7).fill().map((_, i) => start.clone().add(i, 'days'));
  };

  const weekDays = getDaysOfWeek(currentDate);

  // Function to check if there are events for the given date
  const hasEvent = (date) => {
    return events.some(event => moment(event.date).isSame(date, 'day'));
  };

  const onDayPress = (date) => {
    console.log(`Events for ${date.format('dddd, MMMM Do YYYY')}`);
    setCurrentDate(date);
    onDateChange(date.format('YYYY-MM-DD')); // Notify parent component about the selected date
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
