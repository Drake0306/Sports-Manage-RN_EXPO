import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const attendees = [
  { id: '1', name: 'John Doe', status: 'confirmed', icon: 'person-outline' },
  { id: '2', name: 'Jane Smith', status: 'declined', icon: 'person-outline' },
  { id: '3', name: 'Bob Johnson', status: 'pending', icon: 'person-outline' },
  { id: '4', name: 'Alice Brown', status: 'confirmed', icon: 'person-outline' },
  { id: '5', name: 'Charlie Davis', status: 'pending', icon: 'person-outline' },
  { id: '6', name: 'Eva Wilson', status: 'confirmed', icon: 'person-outline' },
  { id: '7', name: 'Frank Miller', status: 'declined', icon: 'person-outline' },
  { id: '8', name: 'Grace Lee', status: 'confirmed', icon: 'person-outline' },
  { id: '9', name: 'Henry Taylor', status: 'pending', icon: 'person-outline' },
  { id: '11', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '12', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '13', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '14', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '15', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '16', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '17', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '18', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '19', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '20', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '21', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
  { id: '22', name: 'Ivy Clark', status: 'confirmed', icon: 'person-outline' },
];

export default function AttendanceList() {
  const [activeTab, setActiveTab] = useState('all');

  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };
  const filteredAttendees = attendees.filter(attendee => {
    if (activeTab === 'all') return true;
    if (activeTab === 'confirmed') return attendee.status === 'confirmed';
    if (activeTab === 'declined') return attendee.status === 'declined';
    if (activeTab === 'pending') return attendee.status === 'pending';
    return true;
  });

  const renderItem = ({ item }) => (
    <View style={styles.attendeeItem}>
      <View style={styles.attendeeItemDiv}>
        <Ionicons
          name={item.icon}
          size={30}
        />
        <Text style={styles.attendeeName}>{item.name}</Text>
      </View>
      <Ionicons
        name={
          item.status === 'confirmed'
            ? 'checkmark-circle-outline'
            : item.status === 'declined'
            ? 'close-circle-outline'
            : 'help-circle-outline'
        }
        size={30}
        color={
          item.status === 'confirmed'
            ? 'green'
            : item.status === 'declined'
            ? 'red'
            : 'orange'
        }
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => redirect('')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => setActiveTab('all')} style={styles.tabButton}>
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('confirmed')} style={styles.tabButton}>
            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color={activeTab === 'confirmed' ? 'green' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('declined')} style={styles.tabButton}>
            <Ionicons
              name="close-circle-outline"
              size={30}
              color={activeTab === 'declined' ? 'red' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('pending')} style={styles.tabButton}>
            <Ionicons
              name="help-circle-outline"
              size={30}
              color={activeTab === 'pending' ? 'orange' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredAttendees}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  activeTabText: {
    color: 'black',
  },
  listContent: {
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',

  },
  attendeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  attendeeItemDiv: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: '#e0e0e0',
  },
  attendeeName: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  headerBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    padding: 5,
  }
});