import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function EventPreview() {
  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => redirect('')}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>WEIGHT TRAINING</Text>
            <Ionicons name="barbell-outline" size={30} color="black" />
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={25} color="black" />
            <Text style={styles.detailText}>5:30 - 7:30 PM</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={25} color="black" />
            <Text style={styles.detailText}>Weight Room</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="information-circle-outline" size={25} color="black" />
            <Text style={styles.detailText}>Make sure to bring flat-soled lifting shoes!</Text>
          </View>

          <View style={styles.detailItemLast}>
            <Ionicons name="people-outline" size={25} color="black" />
            <Text style={styles.detailText}>VARSITY FOOTBALL TEAM</Text>
          </View>
          <Text style={styles.attendanceRequired}>*Attendance required</Text>


          <View style={styles.attendanceStats}>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle-outline" size={30} color="green" />
              <Text style={styles.statText}>35</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="close-circle-outline" size={30} color="red" />
              <Text style={styles.statText}>0</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="help-circle-outline" size={30} color="gray" />
              <Text style={styles.statText}>0</Text>
            </View>
            <TouchableOpacity onPress={() => redirect('/pages/attendeeList')} style={styles.viewListButton}>
              <Ionicons name="list" size={20} color="black" />
              <Text style={styles.viewListText}>View list</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => redirect('/pages/eventModefier')} style={styles.footerButton}>
            <Ionicons name="create-outline" size={24} color="black" />
            <Text style={styles.footerButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="share-social-outline" size={24} color="black" />
            <Text style={styles.footerButtonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="trash-outline" size={24} color="black" />
            <Text style={styles.footerButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
  },
  attendanceRequired: {
    marginTop: 8,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 16,
  },
  viewListButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewListText: {
    marginLeft: 4,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    marginTop: 4,
  },
});