import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Sample event data
const eventsData = {
  '2024-10-05': ['Event 1', 'Event 2', 'Event 3'],
  '2024-10-10': ['Event 4'],
  '2024-10-15': ['Event 5', 'Event 6'],
  // Add more events as needed
};

export default function CalendarComponent({ onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = daysInMonth[0].getDay();

    return (
      <View style={styles.daysContainer}>
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <View key={`empty-${index}`} style={styles.dayItem} />
        ))}
        {daysInMonth.map((day) => {
          const isSelected = day.toDateString() === selectedDate.toDateString();
          const dateString = day.toISOString().split('T')[0];
          const events = eventsData[dateString] || [];

          return (
            <TouchableOpacity
              key={day.getDate()}
              style={[styles.dayItem, isSelected && styles.selectedDay]}
              onPress={() => {
                setSelectedDate(day);
                onDateChange(day); // Call the date change function
              }}
            >
              <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                {day.getDate()}
              </Text>
              <View style={styles.dotsContainer}>
                {events.slice(0, 3).map((_, index) => (
                  <View key={index} style={styles.dot} />
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <ChevronLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <ChevronRightIcon size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>
      {renderDays()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 30,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    padding: 15,
  },
  weekDayText: {
    fontSize: 12,
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayItem: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dayText: {
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 10,
  },
  selectedDayText: {
    color: 'white',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginHorizontal: 1,
  },
});
