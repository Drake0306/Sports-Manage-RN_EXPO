import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft, MoreVertical } from 'lucide-react-native';

const messages = [
  { id: 1, text: "Hey Coach Tony! Thank you so much for your feedback on our pitch!", sender: 'user', time: '16:04' },
  { id: 2, text: "For that reason, I'm in!", sender: 'coach', time: '16:04' },
  { id: 3, text: "Let me introduce you to my friend from Sequoia Capital. He'd be interested to hear more about Motiv.", sender: 'coach', time: '16:04' },
  { id: 4, text: "That would be awesome! Here's our email: wymotiv@gmail.com", sender: 'user', time: '16:04' },
  { id: 5, text: "Great - talk soon.", sender: 'coach', time: '16:04' },
];

export default function Chat() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <ArrowLeft color="#000" size={24} /> */}
        <View style={styles.headerTitle}>
          <Image source={{ uri: '/placeholder.svg?height=40&width=40' }} style={styles.avatar} />
          <Text style={styles.headerText}>TONY ZINGALE</Text>
        </View>
        {/* <MoreVertical color="#000" size={24} /> */}
      </View>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message) => (
          <View key={message.id} style={[
            styles.messageContainer,
            message.sender === 'user' ? styles.userMessage : styles.coachMessage
          ]}>
            {message.sender === 'coach' && (
              <Image source={{ uri: '/placeholder.svg?height=32&width=32' }} style={styles.messageAvatar} />
            )}
            <View style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.coachBubble
            ]}>
              <Text style={message.sender === 'user' ? styles.messageText : styles.coachMessageText}>{message.text}</Text>
            </View>
            {message.sender === 'user' && (
              <Image source={{ uri: '/placeholder.svg?height=32&width=32' }} style={styles.messageAvatar} />
            )}
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  coachMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#4A4A4A',
    borderBottomRightRadius: 4,
    marginLeft: 8,
  },
  coachBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    marginRight: 8,
    color: '#000000',
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
    position: 'absolute',
    bottom: -20,
    right: 0,
  },
});