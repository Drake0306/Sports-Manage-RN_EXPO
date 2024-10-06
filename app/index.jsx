import { Redirect } from "expo-router";
import {  useState } from "react";
import { Text } from "react-native";

const StartPage = () => {
  const [loading, setLoading] = useState(false); // Local state for loading
  const [error, setError] = useState(null); // Local state for error
  const [url, setURL] = useState('/home');

  

  // Handle loading and error states
  if (loading) {
    return <Text>Loading...</Text>; // You can replace this with any loader UI
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Display error message
  }

  // Conditionally redirect based on userRole
  return <Redirect href={url} />;
};

export default StartPage;
