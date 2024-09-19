// utils/auth.js
import * as Keychain from 'react-native-keychain';

export const storeToken = async (token) => {
  if (token) {
    await Keychain.setGenericPassword('userToken', token);
  }
};

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
