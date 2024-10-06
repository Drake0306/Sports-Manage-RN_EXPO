import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { Platform, PermissionsAndroid } from 'react-native';

export default function AddEvent() {
  const [allDay, setAllDay] = useState(false);
  const [time1, setTime1] = useState(new Date());
  const [time2, setTime2] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDetails, setEventDetails] = useState([]);

  // Handle date change for the date picker
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Handle time change for the time picker
  const onTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      if (activeInput === 'time1') {
        setTime1(selectedTime);
      } else if (activeInput === 'time2') {
        setTime2(selectedTime);
      }
    }
  };

  const showTimePicker = (inputName) => {
    setActiveInput(inputName);
    setShowPicker(true);
  };

  const showDPicker = () => {
    setShowDatePicker(true);
  };

  const redirect = (url) => {
    if (url === '') {
      router.back();
    } else {
      router.navigate(url);
    }
  };

  // Function to create the event and add it to the device's calendar
  const createEvent = async () => {
    try {
      // Check permissions for Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
          {
            title: 'Calendar Access Permission',
            message: 'This app needs access to your calendar to add events.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Calendar permission is required to add events.');
          return;
        }
      }

      const eventConfig = {
        title: eventTitle || 'New Event',
        startDate: time1.toISOString(), // Start time in ISO format
        endDate: time2.toISOString(), // End time in ISO format
        location: eventLocation || 'No location specified',
        allDay: allDay,
        notes: 'Event created via app',
      };

      // Add event to the calendar
      const eventInfo = await AddCalendarEvent.presentEventCreatingDialog(eventConfig);
      if (eventInfo.action === 'SAVED') {
        // Event saved to calendar, add it to local state
        setEventDetails([
          ...eventDetails,
          {
            title: eventTitle,
            location: eventLocation,
            startDate: time1,
            endDate: time2,
          },
        ]);
        Alert.alert('Success', 'Event added to the calendar!');
        redirect('');
        // Optionally redirect or reset inputs
      } else if (eventInfo.action === 'CANCELED') {
        Alert.alert('Cancelled', 'Event creation was cancelled.');
      }
    } catch (error) {
      console.error('Error adding event to calendar:', error);
      Alert.alert('Error', 'Could not add event to the calendar.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>ADD NEW EVENT</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={eventTitle}
          onChangeText={setEventTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Description"
        />

        <View style={styles.dateContainer}>
          <TextInput
            style={styles.dateInput}
            value={date.toLocaleDateString()}
            placeholder="MM/DD/YYYY"
            onFocus={showDPicker}
          />
          <TouchableOpacity onPress={showDPicker}>
            <Ionicons name="calendar" size={24} color="gray" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.switchContainer}>
          <Text>All day</Text>
          <Switch value={allDay} onValueChange={setAllDay} />
        </View>

        <View style={styles.timeContainer}>
          <TextInput
            style={styles.timeInput}
            value={time1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            placeholder="Start Time"
            onFocus={() => showTimePicker('time1')}
          />
          <TextInput
            style={styles.timeInput}
            value={time2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            placeholder="End Time"
            onFocus={() => showTimePicker('time2')}
          />
          {showPicker && (
            <DateTimePicker
              value={activeInput === 'time1' ? time1 : time2}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location" size={24} color="gray" />
          <TextInput
            style={styles.locationInput}
            placeholder="Event Location"
            value={eventLocation}
            onChangeText={setEventLocation}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonCancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={createEvent} style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Create Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '48%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007bff',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonCancelText: {
    color: '#333',
  },
});
