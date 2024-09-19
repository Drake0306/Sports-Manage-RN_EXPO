import { getMinutes } from "date-fns";

const BASE_URL = 'http://192.168.114.196:4000'; // Replace with your actual IP address

export const signupUser = async ({ firstname, lastname, email, password, role }) => {
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
        status: 'active',
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Network response was not ok');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error signing up:', error);
    throw error; 
  }
};
