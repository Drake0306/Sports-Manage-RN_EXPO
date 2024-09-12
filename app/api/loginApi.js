// Define the base URL for your API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Function to fetch data from the API
export const fetchLoginData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: 'GET', // Use GET method to fetch data
      headers: {
        'Content-Type': 'application/json', // Set appropriate headers
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Parse JSON data from the response
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate the error
  }
};
