import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function EventModefier() {
  const [allDay, setAllDay] = useState(false);
  const [requireAttendance, setRequireAttendance] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.title}>WEIGHT TRAINING</Text>
        <View style={styles.iconContainer}>
          <Feather name="activity" size={24} color="#000" />
          <View style={styles.tealCircle} />
        </View>
      </View> */}

      <View style={styles.row}>
        <Text style={styles.rowText}>WEIGHT TRAINING</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
        <Feather name="clock" size={24} color="#000" />
        <Text style={styles.rowText}>All day</Text>
        <Switch
          value={allDay}
          onValueChange={setAllDay}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={allDay ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>Thu, Sep 5</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>10:00</Text>
          <View style={styles.amPmContainer}>
            <Text style={[styles.amPmText, styles.activeAmPm]}>AM</Text>
            <Text style={styles.amPmText}>PM</Text>
          </View>
        </View>
      </View>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>Thu, Sep 5</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>11:30</Text>
          <View style={styles.amPmContainer}>
            <Text style={[styles.amPmText, styles.activeAmPm]}>AM</Text>
            <Text style={styles.amPmText}>PM</Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <Feather name="map-pin" size={24} color="#000" />
        <Text style={styles.rowText}>WEIGHT ROOM</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Feather name="repeat" size={24} color="#888" />
        <Text style={[styles.rowText, { color: '#888' }]}>DON'T REPEAT</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Feather name="bell" size={24} color="#000" />
        <Text style={styles.rowText}>30 MINS BEFORE</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Feather name="calendar" size={24} color="#000" />
        <Text style={styles.rowText}>Bring your lifting shoes (flat soled)!</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Feather name="users" size={24} color="#000" />
        <Text style={styles.rowText}>VARSITY FOOTBALL</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Require Attendance</Text>
        <Switch
          value={requireAttendance}
          onValueChange={setRequireAttendance}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={requireAttendance ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]}>
          <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tealCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#20B2AA',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rowText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  amPmContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    overflow: 'hidden',
  },
  amPmText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
  },
  activeAmPm: {
    backgroundColor: '#FFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#FFF',
  },
});