import { create } from 'zustand';
import { fetchLoginData } from '../api/loginApi';

// Zustand store setup
const useLoginStore = create((set) => ({
  loginData: null, // State to store login data
  loading: false, // State to indicate loading status
  error: null, // State to store any errors

  // Function to fetch login data and update the store
  fetchLoginData: async () => {
    set({ loading: true, error: null }); // Set loading to true and clear error
    try {
      const data = await fetchLoginData(); // Fetch data from API
      set({ loginData: data, loading: false }); // Update store with fetched data and set loading to false
    } catch (error) {
      set({ error: error.message, loading: false }); // Update store with error and set loading to false
      console.error('Error fetching data:', error);
    }
  },
}));

export default useLoginStore;
