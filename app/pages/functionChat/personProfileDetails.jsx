import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Info, Shield } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from "expo-router";

export default function PersonProfileDetails() {
  const [readReceipts, setReadReceipts] = React.useState(false);
  const [typingIndicator, setTypingIndicator] = React.useState(false);
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
        <TouchableOpacity style={styles.backButton} onPress={() => redirect('')}>
            <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
        
        <View style={styles.profileImages}>
            <Image source={{ uri: '/placeholder.svg?height=50&width=50' }} style={styles.smallProfile} />
            <Image source={{ uri: '/placeholder.svg?height=70&width=70' }} style={styles.largeProfile} />
            <Image source={{ uri: '/placeholder.svg?height=40&width=40' }} style={[styles.smallProfile, styles.rightProfile]} />
        </View>

        <Text style={styles.heading}>PRIVACY & SAFETY</Text>

        <View style={styles.settingItem}>
            <View>
            <Text style={styles.settingTitle}>Read receipts</Text>
            <Text style={styles.settingDescription}>Others can see when you've read their messages.</Text>
            </View>
            <Switch
            value={readReceipts}
            onValueChange={setReadReceipts}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={readReceipts ? "#f5dd4b" : "#f4f3f4"}
            />
        </View>

        <View style={styles.settingItem}>
            <View>
            <Text style={styles.settingTitle}>Typing indicator</Text>
            <Text style={styles.settingDescription}>Others can see when you're typing.</Text>
            </View>
            <Switch
            value={typingIndicator}
            onValueChange={setTypingIndicator}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={typingIndicator ? "#f5dd4b" : "#f4f3f4"}
            />
        </View>

        <TouchableOpacity style={styles.infoButton}>
            <Info color="#000" size={24} />
            <Text style={styles.infoText}>Who can see chats?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reportButton}>
            <Shield color="#ff0000" size={24} />
            <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  backButton: {
    marginBottom: 20,
  },
  profileImages: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  smallProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey'

  },
  largeProfile: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: -15,
    zIndex: 1,
    backgroundColor: 'grey'

  },
  rightProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'grey'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ff0000',
  },
});