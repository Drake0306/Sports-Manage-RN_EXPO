import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = [18, 19, 20, 21, 22, 23, 24];

export default function HomeC() {
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const [announcement, setAnnouncement] = useState('');

  const redirect = (url) => {
    router.navigate(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>VARSITY FOOTBALL</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.profileName}>ROBRICH</Text>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabContainer}>
          {['UPCOMING', 'DONATE', 'RESOURCES'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calendar */}
        <Text style={styles.calendarTitle}>OCTOBER 18TH, 2024</Text>
        <View style={styles.calendar}>
          {days.map((day, index) => (
            <View key={day} style={styles.calendarDay}>
              <Text style={[styles.calendarDayText, index === 0 && styles.activeCalendarDay]}>{dates[index]}</Text>
              <Text style={styles.calendarDayName}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Event */}
        <View style={styles.eventContainer}>
          <View style={styles.eventTimeContainer}>
            <Text style={styles.eventTime}>05:30 PM</Text>
            <Text style={styles.eventTime}>07:00 PM</Text>
          </View>
          <View style={styles.eventDetailsContainer}>
            <Text style={styles.eventTitle}>WEIGHT TRAINING</Text>
            <Text style={styles.eventLocation}>Loveland HS Weight Room</Text>
          </View>
          <TouchableOpacity onPress={() => redirect('/(coach-view)/eventPreview')}>
            <Feather name="edit-2" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Announcement Input */}
        <View style={styles.announcementContainer}>
          <Text style={styles.announcementTitle}>POST AN ANNOUNCEMENT</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Start typing..."
              value={announcement}
              onChangeText={setAnnouncement}
              multiline
            />
            <TouchableOpacity style={styles.sendButton}>
              <Feather name="arrow-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Previous Announcements */}
        <TouchableOpacity style={styles.previousAnnouncements}>
          <Text style={styles.previousAnnouncementsText}>PREVIOUS ANNOUNCEMENTS</Text>
        </TouchableOpacity>

        {/* Team Roster */}
        <View style={styles.rosterContainer}>
          <Text style={styles.rosterTitle}>TEAM ROSTER</Text>
          <View style={styles.rosterActions}>
            <Feather name="search" size={24} color="#000" />
            <Feather name="sliders" size={24} color="#000" />
            <Feather name="arrow-up-down" size={24} color="#000" />
          </View>
        </View>

        {/* Player Card */}
        <View style={styles.playerCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }}
            style={styles.playerImage}
          />
          <View style={styles.playerInfo}>
            <Text style={styles.playerNumber}>1</Text>
            <View>
              <Text style={styles.playerName}>JADEN WALTON</Text>
              <Text style={styles.playerDetails}>Senior | WR, DB / 6' / 175 lbs.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF3B30',
  },
  tabText: {
    color: '#888',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#FF3B30',
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  calendarDay: {
    alignItems: 'center',
  },
  calendarDayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeCalendarDay: {
    color: '#FF3B30',
  },
  calendarDayName: {
    color: '#888',
    marginTop: 4,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  eventTimeContainer: {
    marginRight: 16,
  },
  eventTime: {
    color: '#888',
  },
  eventDetailsContainer: {
    flex: 1,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventLocation: {
    color: '#888',
  },
  announcementContainer: {
    padding: 16,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  sendButton: {
    padding: 12,
  },
  previousAnnouncements: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    marginTop: 16,
  },
  previousAnnouncementsText: {
    fontWeight: 'bold',
  },
  rosterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  rosterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rosterActions: {
    flexDirection: 'row',
    gap: 16,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 16,
    color: '#FF3B30',
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  playerDetails: {
    color: '#888',
  },
});