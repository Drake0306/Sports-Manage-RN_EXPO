import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,ActivityIndicator, Modal, FlatList } from 'react-native';
import { useRouter} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSignupStore } from "../../store/signupStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { storeToken } from "./../authUtils";

export default function ProfileCreation() {
  const { fetchOrganizationsCoaches, signup, sendOtp } =
    useSignupStore();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [coachTypes, setCoachTypes] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Modal state for organizations


  const refirect = (url) => {
    if (url == '') {
        router.back();
    } else {
        router.navigate(url);
    }
  };

  useEffect(() => {
    // Fetch organizations and coaches on component mount
    const fetchCoaches = async () => {
      try {
        const data = await fetchOrganizationsCoaches();

        // Check if the response is successful
        if (!data.error) {
          setOrganizations(data.organizations); // Set organizations from the response
          setCoachTypes(data.coaches); // Assuming coach types are in the same response
        }
      } catch (error) {
        console.error("Error fetching coaches:", error);
      } finally {
        setLoadingData(false); // Stop loading once data is fetched
      }
    };

    fetchCoaches();
  }, [fetchOrganizationsCoaches]);

  const handleContinue = async () => {

    // Validation
    if (!firstName) {
      Alert.alert('Validation Error', 'First Name is required.');
      return;
    }
    if (lastName === '') {
      // Allow last name to be empty, no action needed here
    }
    if (!email) {
      Alert.alert('Validation Error', 'Email is required.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (!selectedOrganization) {
      Alert.alert('Organization must be selected');
      return;
    }
    if (!acceptTerms) {
      Alert.alert('Terms & Conditions', 'You must accept the terms & conditions to continue.');
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Simulate a network request or any processing needed
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading for 2 seconds

      // Store user data in local storage
      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Redirect to the next screen
      refirect('/student/accountCreation');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const renderOrganizationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setSelectedOrganization(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.listItemText}>{item.name}</Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => refirect('')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.title}>CREATE AN ACCOUNT</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>FIRST NAME</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter First Name"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>LAST NAME</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Last Name"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NAME OF SCHOOL</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisible(true)} // Open modal on press
          >
            <Text style={styles.dropdownText}>
              {selectedOrganization
                ? selectedOrganization.name
                : "Select Organization"}
            </Text>
          </TouchableOpacity>
          {loadingData ? (
            <ActivityIndicator size="large" color="black" />
          ) : null}
          {errors.selectedOrganization && (
            <Text style={styles.errorText}>{errors.selectedOrganization}</Text>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={organizations}
                renderItem={renderOrganizationItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </Modal>
        
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            {acceptTerms && <View style={styles.checkboxInner} />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Accept the <Text style={styles.termsLink}>Terms & Conditions</Text>
          </Text>
        </View>
        
        <Text style={styles.loginText}>
          Already have an account? <Text onPress={() => refirect('/sign-in')} style={styles.loginLink}>Log In</Text>
        </Text>
        
        <TouchableOpacity onPress={() => refirect('/student/accountCreation')} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    padding: 20,
    fontSize: 16,
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: '#999',
    paddingVertical: 15,
  },
  dropdownIcon: {
    marginLeft: 'auto',
    fontSize: 16,
    color: '#999',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
  },
  termsText: {
    fontSize: 14,
  },
  termsLink: {
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  loginLink: {
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
    maxHeight: "80%",
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
  },
  dropdownText: {
    fontSize: 16,
  },
});