const BASE_URL = 'http://YOUR_IP_ADDRESS:3000'; // Replace with your actual IP address

export const signupUser = async ({ firstName, lastName, email, password, role }) => {
  try {
    
    const response = await fetch(`https://dummyjson.com/posts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // firstname: firstName,
        // lastname: lastName,
        // email,
        // password,
        // role,
        // status: 'active',
        title: 'I am in love with someone.',
        userId: 5,
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
