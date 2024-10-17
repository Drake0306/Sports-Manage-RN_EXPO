import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Share, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { Link, router } from "expo-router";
import { removeToken } from "./../(auth)/authUtils";
import { useSignupStore } from './../store/signupStore'; // Adjust path as needed



export default function UserProfile() {
  const { logout  } = useSignupStore();
  const [loading, setLoading] = useState(false); // Local loading state


  const [timeLeft, setTimeLeft] = useState(29);
  const [code, setCode] = useState(123456);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 29));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(String(code)); // Copy the code to clipboard
    Alert.alert('Copied', 'Code copied to clipboard!'); // Show a confirmation message
  };

  const shareCode = async () => {
    try {
      await Share.share({
        message: `${code}`, // Message to share
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the code.'); // Error handling
    }
  };

  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };


  // In your UserProfile component

const handleLogout = async () => {
  
  setLoading(true); // Start the loader
  try {
    const response = await logout(); // Call the logout function from the store
    await removeToken(); // Remove the token from storage

    if (response.error) {
      Alert.alert("Error", response.message); // Handle logout error
    } else {
      Alert.alert(
        "Logged Out",
        response.message,
        [
          {
            text: "OK",
            onPress: () => Redirect('/(auth)/sign-in'),
          },
        ]
      );
    }
  } catch (error) {
    console.error("Error during logout", error);
    Alert.alert("Error", "There was a problem logging you out. Please try again.");
  } finally {
    setLoading(false); // Stop the loader
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => redirect('')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
        <View style={styles.header}>
          <Image
            source={{ uri: "/placeholder.svg?height=80&width=80" }}
            style={styles.profileImage}
          />
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.button} onPress={() => redirect('/pages/teamCodeEntry')}>
              <Ionicons name="people-outline" size={20} color="black" />
              <Text style={styles.buttonText}>JOIN A TEAM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => redirect('/pages/userEditProfile')}>
              <Ionicons name="create-outline" size={20} color="black" />
              <Text style={styles.buttonText}>EDIT PROFILE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.name}>ROB RICHARDSON</Text>
        <Text style={styles.team}>LOVELAND TIGERS</Text>
        <Text style={styles.position}>FOOTBALL HEAD COACH</Text>

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>
            "Mind sharper than a needle kit!" 🧠💉
            Coach RR 🏈
          </Text>
        </View>

        <View style={styles.teamCodeContainer}>
          <Text style={styles.teamCodeLabel}>TEAM CODE:</Text>
          <Text style={styles.teamCodeValue}>VARSITY FOOTBALL</Text>
        </View>

        <View style={styles.codeContainer}>
          <Text style={styles.code}>{code}</Text>
          <View style={styles.codeButtons}>
            <TouchableOpacity style={styles.codeButton} onPress={copyToClipboard}>
              <Ionicons name="copy-outline" size={24} color="black" />
              <Text style={styles.codeButtonText}>COPY CODE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.codeButtonShare} onPress={shareCode}>
              <Ionicons name="share-social-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.refreshText}>{timeLeft}s until refresh</Text>

        <TouchableOpacity style={styles.option} onPress={() => redirect('/pages/bugReport')}>
          <Ionicons name="bug-outline" size={24} color="black" />
          <Text style={styles.optionText}>Report a bug</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => redirect('/pages/requestAFeature')}>
          <Ionicons name="bulb-outline" size={24} color="black" />
          <Text style={styles.optionText}>Submit a feature request</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => redirect('/pages/privacyPolicy')}>
          <Ionicons name="shield-outline" size={24} color="black" />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changePassword}>
          <Text style={styles.changePasswordText}>Change password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logOut}>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  loaderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  headerButtons: {
    flex: 1,
    // marginLeft: 5,
    maxWidth: 200,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  team: {
    fontSize: 20,
    color: 'red',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  quoteContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: 'black', // Border color
    borderTopWidth: 1,       // Border width to make it visible
    borderBottomWidth: 1,    // Border width to make it visible
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  quoteAuthor: {
    fontSize: 14,
    textAlign: 'right',
  },
  teamCodeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  teamCodeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  codeButtonText: {
    paddingTop: 2,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  teamCodeValue: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'col',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  code: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 20,
  },
  codeButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  codeButton: {
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'black', // Border color
    borderWidth: 1,       // Border width to make it visible
    padding: 10,
  },
  codeButtonShare: {
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 50,
    borderColor: 'black', // Border color
    borderWidth: 1,       // Border width to make it visible
    padding: 10,
  },
  refreshText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 5,
    borderRadius: 10,
    borderColor: 'grey', // Border color
    borderWidth: 1,       // Border width to make it visible
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  changePassword: {
    marginTop: 10,
    alignItems: 'center',
  },
  changePasswordText: {
    fontSize: 16,
    color: '#343434',
  },
  logOut: {
    marginTop: 10,
    alignItems: 'center',
  },
  logOutText: {
    fontSize: 16,
    color: 'red',
  },
});