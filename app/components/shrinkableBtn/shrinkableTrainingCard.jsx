import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ChevronUpIcon, ChevronDownIcon, CircleCheck } from 'lucide-react-native';

export default function ShrinkableTrainingCard() {
  const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default
  const [heightValue] = useState(new Animated.Value(80)); // Start with collapsed height (60)

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
          <View style={styles.collapsedFullContent}>
            <View style={styles.collapsedContent}>
              <Text style={styles.collapsedTitle}>WEIGHT TRAINING</Text>
              <CircleCheck size={24} color="#4CAF50" />
            </View>
            <View style={styles.collapsedContent}>
              <Text style={styles.collapsedSubtitle}>Loveland HS Weight Room</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>WEIGHT TRAINING</Text>
            <CircleCheck size={24} color="#4CAF50" />
          </View>
          <Text style={styles.subtitle}>Loveland HS Weight Room</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.yesButton]}>
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.noButton]}>
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footer}>07:00 PM</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    marginTop: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
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
    color: '#666',
    textAlign: 'right',
  },
});
