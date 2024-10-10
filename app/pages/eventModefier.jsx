import React, { useState } from 'react';
import { View, Text,TextInput, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EventModefier() {
  const [allDay, setAllDay] = useState(false);
  const [requireAttendance, setRequireAttendance] = useState(true);
  const [time1, setTime1] = useState(new Date()); // For first time input
  const [time2, setTime2] = useState(new Date()); // For second time input
  const [showPicker, setShowPicker] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // To track which input is active
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to show the date picker
  const showDPicker = () => {
    setShowDatePicker(true);
  };

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate); // Update the state with the selected date
    }
  };

  const onChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      if (activeInput === 'time1') {
        setTime1(selectedTime); // Update time1 if the first input was active
      } else if (activeInput === 'time2') {
        setTime2(selectedTime); // Update time2 if the second input was active
      }
    }
  };

  const showTimePicker = (inputName) => {
    setActiveInput(inputName); // Set the active input when the time picker is shown
    setShowPicker(true);
  };

  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => redirect('')}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="Weight Training" />
        <TextInput style={styles.input} placeholder="Bring your lifting shoes (flat soled)!" />

        <View style={styles.dateContainer}>
          <TextInput
            style={styles.dateInput}
            value={date.toLocaleDateString()} // Display the selected date
            placeholder="MM/DD/YYYY"
            onFocus={showDPicker} // Show the date picker when focused
          />

          {/* Make the calendar icon clickable */}
          <TouchableOpacity onPress={showDPicker}>
            <Ionicons name="calendar" size={24} color="gray" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange} // Handle the date change
            />
          )}
          {/* <TextInput style={styles.dateInput} placeholder="October 2, 2024" /> */}
        </View>

        <View style={styles.switchContainer}>
          <Text>All day</Text>
          <Switch value={allDay} onValueChange={setAllDay} />
        </View>

        <View style={styles.timeContainer}>
          <TextInput
            style={styles.timeInput}
            value={time1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            placeholder="HH:MM AM/PM"
            onFocus={() => showTimePicker('time1')} // Set the active input to 'time1'
          />

          <TextInput
            style={styles.timeInput}
            value={time2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            placeholder="HH:MM AM/PM"
            onFocus={() => showTimePicker('time2')} // Set the active input to 'time2'
          />

          {showPicker && (
            <DateTimePicker
              value={activeInput === 'time1' ? time1 : time2} // Show time picker for the correct input
              mode="time"
              display="default"
              onChange={onChange}
            />
          )}
          {/* <TextInput style={styles.timeInput} placeholder="5:30 PM" /> */}
          {/* <TextInput style={styles.timeInput} placeholder="7:00 PM" /> */}
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location" size={24} color="gray" />
          <TextInput style={styles.locationInput} placeholder="Weight Room" />
        </View>

        <Text style={styles.sectionTitle}>Select Attendees</Text>
        <View style={styles.attendeesContainer}>
          <TouchableOpacity style={styles.attendeeButton}>
            <Ionicons name="people" size={18} color="black" />
            <Text>Varsity Football</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attendeeButton}>
            <Ionicons name="people" size={18} color="black" />
            <Text>Football Coaches</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addNewButton}>
          <Text style={styles.addNewText}>+ Add new</Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text>Require Attendance</Text>
          <Switch value={requireAttendance} onValueChange={setRequireAttendance} />
        </View>

        <Text style={styles.sectionTitle}>Select Category</Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#E6E6FA' }]}>
            <Text>Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#E0FFF0' }]}>
            <Text>Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#E6F3FF' }]}>
            <Text>Team Outing</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addNewButton}>
          <Text style={styles.addNewText}>+ Add new</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => redirect('')} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonCancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Save</Text>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
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
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  attendeesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  attendeeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  addNewButton: {
    marginBottom: 10,
  },
  addNewText: {
    color: 'blue',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '30%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonCancelText: {
    color: 'black',
    fontWeight: 'bold',
  },
});