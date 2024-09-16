import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { height } = Dimensions.get('window');
const MINIMIZED_HEIGHT = 100;
const HALF_HEIGHT = height / 1.3;

export default function Notifications() {
  const [expanded, setExpanded] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const scrollViewRef = useRef(null);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    // onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy < -50 && !expanded) {
        expandOverlay();
      } else if (gestureState.dy > 50 && expanded) {
        minimizeOverlay();
      } else {
        resetPosition();
      }
    },
  });

  const expandOverlay = () => {
    Animated.spring(pan.y, {
      toValue: -HALF_HEIGHT + MINIMIZED_HEIGHT,
      useNativeDriver: false,
    }).start();
    setExpanded(true);
  };

  const minimizeOverlay = () => {
    Animated.spring(pan.y, {
      toValue: HALF_HEIGHT,
      useNativeDriver: false,
    }).start();
    setExpanded(false);
  };

  const resetPosition = () => {
    Animated.spring(pan.y, {
      toValue: expanded ? -HALF_HEIGHT + MINIMIZED_HEIGHT : 0,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeight = pan.y.interpolate({
    inputRange: [-HALF_HEIGHT + MINIMIZED_HEIGHT, 0],
    outputRange: [HALF_HEIGHT, MINIMIZED_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.overlay, { height: animatedHeight }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.handle} />
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={expanded}
        contentContainerStyle={styles.scrollContent}
      >
        <CoachMessage
          name="COACH TONY"
          message="Hey team! Looking forward to a great first practice! If you haven't already, please turn in..."
          timestamp="10/6/23 3:33PM"
          icon="user-circle"
        />
        <CoachMessage
          name="COACH ABBY"
          message="Great job on friday everyone, That was a big win! Take some rest and see you on Monday!"
          timestamp="10/1/23 10:23AM"
          icon="basketball-ball"
        />
        <CoachMessage
          name="COACH ROB"
          message="Great season guys! Keep up the good work in school and congrats to our Seniors!"
          timestamp="9/15/23 11:29AM"
          icon="football-ball"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Previous Announcements</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

function CoachMessage({ name, message, timestamp, icon }) {
  return (
    <View style={styles.messageContainer}>
      <FontAwesome name={icon} size={24} color="white" style={styles.icon} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fd5b49',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
