import { Redirect } from "expo-router";
import { fetchLoginData as fetchLoginApiData } from './api/loginApi';
import { useEffect, useState } from "react";
import { Text } from "react-native";

const StartPage = () => {
  const [userRole, setUserRole] = useState(""); // Local state for user role
  const [loginData, setLoginData] = useState(null); // Local state for login data
  const [loading, setLoading] = useState(false); // Local state for loading
  const [error, setError] = useState(null); // Local state for error
  const [url, setURL] = useState('/sign-in');

  useEffect(() => {
    // Fetch login data on component mount
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLoginApiData(); // Fetch data from API
        setLoginData(data); // Set login data
        // Set user role based on the title in the response
        if (data && typeof data.title === 'string') {
          setUserRole('parent'); // Set user role to 'admin' if title is a string
          // setURL('/home');
          setURL('/homeC');
        } else {
          setUserRole('coach'); // Default to 'guest' if title is not a string
        }
      } catch (error) {
        setError(error.message); // Set error message
        setURL('/sign-in');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

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
