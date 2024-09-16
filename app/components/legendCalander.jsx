import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { addDays, format } from 'date-fns';
import { Feather } from '@expo/vector-icons';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';

const timeSlots = Array.from({ length: 21 }, (_, i) => i + 4); // 4 PM to 12 AM

const events = [
  { id: 1, title: 'Weight Training', start: '07:00', end: '9:00', color: '#81D4FA' },
  { id: 2, title: 'Practice', start: '16:00', end: '18:00', color: '#A5D6A7' },
  { id: 3, title: 'Bus Ride', start: '17:00', end: '17:30', color: '#90CAF9' },
  { id: 4, title: 'Warm Ups', start: '17:30', end: '18:00', color: '#FFF59D' },
  { id: 5, title: 'Game At Sycamore High School', start: '18:00', end: '20:00', color: '#FFCC80' },
  { id: 6, title: 'Team Pizza Dinner & Social', start: '20:00', end: '22:00', color: '#CE93D8' },
];

export default function LegendCalander() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderTimeSlots = () => {
    return timeSlots.map((hour) => (
      <View key={hour} style={styles.timeSlot}>
        <Text style={styles.timeText}>{hour % 12 || 12} {hour >= 12 ? 'PM' : 'AM'}</Text>
      </View>
    ));
  };

  const renderEvents = () => {
    return events.map((event) => {
      const startHour = parseInt(event.start.split(':')[0]);
      const endHour = parseInt(event.end.split(':')[0]);
      const duration = endHour - startHour;
      const top = (startHour - 4) * 60; // 4 PM is the start of our time slots

      return (
        <View
          key={event.id}
          style={[
            styles.event,
            {
              top,
              height: duration * 60,
              backgroundColor: event.color,
            },
          ]}
        >
          <Text style={styles.eventTitle}>{event.title}</Text>
        </View>
      );
    });
  };

  const renderWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(selectedDate, i);
      days.push(
        <View key={i} style={styles.dayColumn}>
          <Text style={styles.dayText}>{format(date, 'EEE')}</Text>
          <Text style={styles.dateText}>{format(date, 'd')}</Text>
        </View>
      );
    }
    return days;
  };

  return (
    <View style={styles.container}>
      {/* <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(new Date(day.timestamp))}
        hideExtraDays
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
        }}
      /> */}
      <View style={styles.weekContainer}>
        {renderWeekDays()}
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.timeSlotsContainer}>{renderTimeSlots()}</View>
          <View style={styles.eventsContainer}>{renderEvents()}</View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  timeSlotsContainer: {
    width: 50,
  },
  timeSlot: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  eventsContainer: {
    flex: 1,
    position: 'relative',
  },
  event: {
    position: 'absolute',
    left: 5,
    right: 5,
    padding: 5,
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 12,
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00adf5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});