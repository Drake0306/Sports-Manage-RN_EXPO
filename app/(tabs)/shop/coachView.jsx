import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoachView() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}} >
            Comming Soon
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 40,
    height: 40,
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
  tabpadding: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    padding: 4,
    height: 50,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9E9E9E',
  },
  activeTabText: {
    color: 'black',
  },
  tabContent: {
    flex: 1,
    overflow: 'hidden',
  },
  dateHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  calendarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 1,
  },
  calendarDay: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: 'red',
  },
  calendarDayText: {
    fontSize: 16,
    color: '#888',
  },
  calendarDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  selectedDayText: {
    color: 'white',
  },
  dotIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'red',
    marginTop: 5,
  },
  scheduleContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  scheduleItemLeft: {
    marginRight: 15,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#888',
  },
  scheduleItemRight: {
    flex: 1,
  },
  scheduleItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleIcon: {
    width: 20,
    height: 20,
  },
  scheduleLocation: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  titleHome: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  titleHomeText: {
    fontFamily: 'System',
    fontSize: 27,
    fontWeight: '800',
    color: '#FF0000',
    letterSpacing: 0,
  },
});
