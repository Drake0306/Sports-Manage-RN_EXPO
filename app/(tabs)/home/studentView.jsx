import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WeeklyCalendar from '../../components/weeklyCalendar';
import ShrinkableTrainingCard from '../../components/shrinkableTrainingCard';
import AthleticsQRCode from '../../components/athleticsQRCode';
import Resources from '../../components/resources';
import Notifications from '../../components/notifications';

const tabs = ['UPCOMING', 'DONATE', 'RESOURCES'];

const CalanderArea = () => {
  return (
    <>
      <WeeklyCalendar />
      <ScrollView style={styles.scheduleContainer}>
        <ShrinkableTrainingCard />
      </ScrollView>
    </>
  );
};

export default function StudentView() {
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const opacity = useRef(new Animated.Value(1)).current; // Animated value for opacity

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0, // Fully transparent
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Callback after fade-out completes
    });
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1, // Fully visible
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Callback after fade-out completes
    });
  };

  useEffect(() => {
    fadeIn(); // Start fade-out when activeTab changes
  }, [activeTab]);

  const changeTabs = (tab) => {
    const timer = setTimeout(() => {
      setActiveTab(tab);
    }, 200);
    fadeOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.logo}
        />
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>BENJIM</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/30' }}
            style={styles.profileImage}
          />
        </View>
      </View>
    
      {/* Tab */}
      <View style={styles.tabpadding}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => changeTabs(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Animated.View style={[
        styles.tabContent,
        { opacity } // Apply opacity animation
      ]}>
        {activeTab === 'UPCOMING' && <CalanderArea />}
        {activeTab === 'DONATE' && <AthleticsQRCode />}
        {activeTab === 'RESOURCES' && <Resources />}
      </Animated.View>

      <Notifications />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
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
});
