import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MoveLeft } from 'lucide-react-native';
import { Link, router } from "expo-router";

const announcements = [
  {
    id: '1',
    sender: 'COACH TONY',
    message: 'Hey Sharks, we should definitely invest in Motiv - they gave a great pitch today!',
    timestamp: '10/6/23 3:33PM',
    icon: 'award',
  },
  {
    id: '2',
    sender: 'COACH ABBY',
    message: 'Great job on Friday everyone. That was a big win! Take some rest and see you on Monday!',
    timestamp: '10/1/23 10:23AM',
    icon: 'smile',
  },
  {
    id: '3',
    sender: 'ADMINISTRATOR',
    message: 'Great season guys! Keep up the good work in school and congrats to our Seniors!',
    timestamp: '9/15/23 11:29AM',
    icon: 'user',
  },
  {
    id: '4',
    sender: 'COACH JACOB',
    message: 'Hey Sharks, we should definitely invest in Motiv - they gave a great pitch today!',
    timestamp: '9/6/23 3:33PM',
    icon: 'users',
  },
  {
    id: '5',
    sender: 'ADMINISTRATOR',
    message: 'All coaches should now be registered on Final Forms. If you have not done so, or are having trouble logging in, please contact me ASAP.',
    timestamp: '8/15/23 11:29AM',
    icon: 'user',
  },
];

const AnnouncementItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.itemContent}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
    <View style={styles.iconContainer}>
      <Feather name={item.icon} size={24} color="#000" />
    </View>
  </View>
);

const redirect = (url) => {
    router.navigate(url);
  };

export default function AnnouncementUI() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.titleHeader}>
            <TouchableOpacity onPress={() => redirect('/(tabs)/home')}>
                <MoveLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>ANNOUNCEMENTS</Text>
        </View>
        <FlatList
            data={announcements}
            renderItem={({ item }) => <AnnouncementItem item={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20, // Added padding to the sides
    paddingVertical: 20, // Ensure padding on top and bottom as well
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingLeft: 20
  },
  item: {
    flexDirection: 'row',
    padding: 20
  },
  itemContent: {
    flex: 1,
  },
  sender: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  iconContainer: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});
