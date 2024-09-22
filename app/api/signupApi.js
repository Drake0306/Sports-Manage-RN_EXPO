import { getMinutes } from "date-fns";

const BASE_URL = 'http://192.168.114.196:4000'; // Replace with your actual IP address


export const signupUser = async ({ firstname, lastname, email, password, role, contactNumber, dateOfBirth }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        role,
        contactNumber,
        dateOfBirth,
        status: 'active',
      }),
    });

    const data = await response.json(); // Always parse response JSON

    return data; 
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error; // Propagate the error for handling in the component
  }
};

export const fetchLoginData = async ({email,password}) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST', // Use POST method for login
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password}), // Send email and password as body
    });

    const data = await response.json(); 
    
    return data; // Return the data (including the token)
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Propagate the error
  }
};
