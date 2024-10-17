import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignupStore } from "../../store/signupStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { storeToken } from "./../authUtils";

export default function DetailsCreation() {
  const router = useRouter();
  const { fetchOrganizationsCoaches, loading, signup, sendOtp } =
    useSignupStore();
  const [error, setError] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker
  const [coachtype, setCoachtype] = useState("");
  const [organization, setOrganization] = useState("");

  // State for organizations and coach types
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [coachTypes, setCoachTypes] = useState([]);
  const [selectedCoachType, setSelectedCoachType] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Modal state for organizations
  const [coachModalVisible, setCoachModalVisible] = useState(false); // Modal state for coach types
  const [errors, setErrors] = useState({});

  const redirect = (url) => {
    if (url === "") {
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

  const validateInputs = () => {
    let valid = true;
    let newErrors = {};

    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
      valid = false;
    }

    if (!selectedOrganization) {
      newErrors.selectedOrganization = "Organization must be selected";
      valid = false;
    }

    if (!selectedCoachType) {
      newErrors.selectedCoachType = "Coach Type must be selected";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    setError(""); // Clear any existing error

    // Validate inputs and get the result
    const isValid = validateInputs();

    // If inputs are not valid, alert the errors and return
    if (!isValid) {
      // Show validation errors as alerts
      for (const [key, value] of Object.entries(errors)) {
        Alert.alert("Validation Error", value, [{ text: "OK" }]);
      }
      return; // Stop execution if validation fails
    }

    const formattedDOB = dateOfBirth.toISOString().split("T")[0]; // Format date if needed
    setCoachtype(selectedCoachType.type); // Set the coach type state
    setOrganization(selectedOrganization.name);

    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      if (jsonValue !== null) {
        const userData = JSON.parse(jsonValue);
        const { email, firstName, lastName, password, phoneNumber, username } =
          userData;
        try {
          const resp = await signup({
            firstname: firstName.trim(),
            lastname: lastName.trim(),
            email: email.trim(),
            password: password.trim(),
            role: "coach",
            username: username.trim(),
            phoneNumber: `+91${phoneNumber.trim()}`,
            dateOfBirth: formattedDOB,
            coachType: selectedCoachType.id,
            organization: selectedOrganization.id,
          });

          if (resp && !resp.error && resp.token) {
            const otpResp = await sendOtp(`+91${phoneNumber.trim()}`);
            await AsyncStorage.setItem("@phone", `+91${phoneNumber.trim()}`);

            if (otpResp.success) {
              await storeToken(resp.token);
              Alert.alert(
                "Success",
                "Account created successfully! Please check your SMS for the OTP.",
                [
                  {
                    text: "OK",
                    onPress: () => router.navigate(`/OtpVerificationScreen`),
                  },
                ]
              );
            } else {
              Alert.alert("Error", otpResp.message || "Failed to send OTP", [
                { text: "OK" },
              ]);
            }
          } else {
            Alert.alert(
              "Error",
              resp?.message || "An unexpected error occurred",
              [{ text: "OK" }]
            );
          }
        } catch (error) {
          Alert.alert(
            "Error",
            error.message || "An unexpected error occurred",
            [{ text: "OK" }]
          );
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to fetch user data", [{ text: "OK" }]);
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

  const renderCoachTypeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setSelectedCoachType(item);
        setCoachModalVisible(false);
      }}
    >
      <Text style={styles.listItemText}>{item.type}</Text>
    </TouchableOpacity>
  );

  // Function to show the date picker
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  // Function to handle date change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => redirect("")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>CREATE AN ACCOUNT</Text>

        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={40} color="gray" />
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>DATE OF BIRTH</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={showDatePickerModal}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <Text style={styles.input}>
              {dateOfBirth.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {errors.dateOfBirth && (
            <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
          )}
        </View>

        {/* Date Time Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>NAME OF SCHOOL</Text>
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

        {/* Modal for Organization Selection */}
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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>TYPE OF COACH</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setCoachModalVisible(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedCoachType ? selectedCoachType.type : "Select Coach Type"}
            </Text>
          </TouchableOpacity>
          {loadingData ? (
            <ActivityIndicator size="large" color="black" />
          ) : null}
          {errors.selectedCoachType && (
            <Text style={styles.errorText}>{errors.selectedCoachType}</Text>
          )}
        </View>

        {/* Modal for Coach Type Selection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={coachModalVisible}
          onRequestClose={() => setCoachModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={coachTypes}
                renderItem={renderCoachTypeItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </Modal>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleRegister}
          style={styles.submitButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Register</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
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
  listItem: {
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
