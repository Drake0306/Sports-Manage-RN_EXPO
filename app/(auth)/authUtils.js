import * as Keychain from 'react-native-keychain';

// Function to store the token
export const storeToken = async (token) => {
  if (token) {
    await Keychain.setGenericPassword('userToken', token);
  }
};

// Function to retrieve the token
export const retrieveToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password; // Return the stored token
    }
    return null; // No token found
  } catch (error) {
    console.error("Error retrieving token", error);
    return null; // Handle error
  }
};

// Function to remove the token
export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error("Error removing token", error);
  }
};
export const createAuthHeaders = async () => {
  const token = await retrieveToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // Include token if available
  };
};