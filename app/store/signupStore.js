// store/signupStore.js
import { create } from 'zustand';
import { signupUser } from '../api/signupApi';

const useSignupStore = create((set) => ({
  signupData: {},
  loading: false,
  error: null,

  // Function to signup a user
  signup: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await signupUser(userData);
      set({ signupData: data, loading: false }); // Update store with fetched data
      return data; // Return data for the caller
    } catch (error) {
      set({ error: error.message, loading: false }); // Update store with error
      console.error('Error signing up:', error);
      throw error; // Throw error to be caught in the calling function
    }
  },
}));

export default useSignupStore;
