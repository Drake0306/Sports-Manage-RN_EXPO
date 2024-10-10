import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ChevronUpIcon, ChevronDownIcon, CircleCheck, CircleX, Edit, CalendarCog } from 'lucide-react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ShrinkableTrainingCard() {
  const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default
  const [heightValue] = useState(new Animated.Value(80)); // Start with collapsed height (60)

  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(heightValue, {
      toValue: isExpanded ? 80 : 220, // Toggle between collapsed (60) and expanded (200) height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { height: heightValue }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        {isExpanded ? (
          <ChevronUpIcon size={15} color="#000" />
        ) : (
          <ChevronDownIcon size={15} color="#000" />
        )}
        <View style={styles.timeContainer}>
          <Text style={styles.time}>05:30 PM</Text>
          {!isExpanded && 
            <Text style={styles.time}>07:00 PM</Text>
          }
        </View>
        {!isExpanded && (
          <View style={styles.collapsedContent}>
            <View style={styles.collapsedFullContent}>
              <View style={styles.collapsedContent}>
                <Text style={styles.collapsedTitle}>WEIGHT TRAINING</Text>
              </View>
              <View style={styles.collapsedContent}>
                <Text style={styles.collapsedSubtitle}>Loveland HS Weight Room</Text>
              </View>
            </View>
            <TouchableOpacity>
                <CalendarCog size={20} color="black" />
            </TouchableOpacity>
          </View>

        )}
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          <Text style={styles.footer}>07:00 PM</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>WEIGHT TRAINING</Text>
            <TouchableOpacity>
              <CalendarCog size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>Loveland HS Weight Room</Text>
            <Text style={styles.subtitleTwo}>ATTENDEES</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button]}>
                <Text style={styles.btnCheck}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button]}>
                <Text style={styles.btnCheck}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  timeContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 8,
    paddingVertical: 2,
    height: 45,
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginRight: 10,
    padding: 0,
  },
  collapsedSubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: '#666',
  },
  collapsedContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  collapsedFullContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
  },
  collapsedTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 8,
    textAlign: 'left',
  },
  content: {
    marginTop: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 22,

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  subtitleTwo: {
    fontSize: 13,
    color: 'black',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#d9d9d9',
    padding: 8,
    borderRadius: 4,
  },
  btnCheck: {
    fontWeight: 'bold',
    color: 'black',
  },
  yesButton: {
    backgroundColor: '#8BC34A',
  },
  noButton: {
    backgroundColor: '#BDBDBD',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    fontSize: 13,
    color: 'black',
    textAlign: 'left',
    paddingHorizontal: 22,
  },
  btnGreenText: {
    color: '#4CAF50', 
    fontSize: 18, 
    marginTop: 5, 
    marginLeft: 10
  },
  btnRedText: {
    color: '#fb6453', 
    fontSize: 18, 
    marginTop: 5, 
    marginLeft: 10
  },
  btnText: {
    color: 'black', 
    fontSize: 13, 
    marginTop: 5, 
    marginLeft: 10
  },
  contentContainer: {
    paddingHorizontal: 22,
  }
});
