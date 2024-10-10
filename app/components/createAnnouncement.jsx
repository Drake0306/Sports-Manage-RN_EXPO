import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { ArrowRightIcon } from 'lucide-react-native';
import { Link, router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function CreateAnnouncement() {
  const [announcement, setAnnouncement] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log('Announcement submitted:', announcement);
    setAnnouncement('');
    Keyboard.dismiss();
  };

  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POST AN ANNOUNCEMENT</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Start typing..."
          value={announcement}
          onChangeText={setAnnouncement}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
          <ArrowRightIcon color="#000" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.previousButton} onPress={() => redirect('/(tabs)/home/announcementUI')}>
        <Text style={styles.previousButtonText}>PREVIOUS ANNOUNCEMENTS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    minHeight: 100,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    padding: 10,
  },
  previousButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
