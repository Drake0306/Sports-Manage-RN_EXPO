import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey Coach Tony! Thank you so much for your feedback on our pitch!", sender: 'user', time: '16:04' },
    { id: 2, text: "For that reason, I'm in!", sender: 'other', time: '16:04' },
    { id: 3, text: "Let me introduce you to my friend from Sequoia Capital. He'd be interested to hear more about Motiv.", sender: 'other', time: '16:04' },
    { id: 4, text: "That would be awesome! Here's our email: wymotiv@gmail.com", sender: 'user', time: '16:04' },
    { id: 5, text: "Great - talk soon.", sender: 'other', time: '16:04' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: inputText.trim(),
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setInputText('');
    }
  };

  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => redirect('')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TONY ZINGALE</Text>
        <TouchableOpacity onPress={() => redirect('/pages/functionChat/personProfileDetails')}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message) => (
          <View key={message.id} style={[
            styles.messageBubble,
            message.sender === 'user' ? styles.userMessage : styles.otherMessage
          ]}>
            <Text style={message.sender === 'user' ? styles.userMessageText : styles.otherMessageText}>{message.text}</Text>
            <Text style={message.sender === 'user' ? styles.userMssageTime : styles.otherMessageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4d4d4d',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f7f7f7',
  },
  userMessageText: {
    fontSize: 15,
    color: 'white',
  },
  otherMessageText: {
    fontSize: 15,
  },
  userMssageTime: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  otherMessageTime: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});