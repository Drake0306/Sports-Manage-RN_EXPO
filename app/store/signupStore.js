// store/signupStore.js
import { create } from 'zustand';
import { signupUser, fetchLoginData, sendOtp,fetchOrganizationsCoaches, verifyOtp as verifyOtpApi,logoutUser } from '../api/signupApi';

export const useSignupStore = create((set) => ({
  signupData: {},
  organizecoach:{},
  loading: false,
  error: null,

  // Function to signup a user
  signup: async (userData) => {
    set({ loading: true, error: null });
    
    try {
      const data = await signupUser(userData);
      console.log(data);
      set({ signupData: data, loading: false }); // Update store with fetched data
      return data; // Return data for the caller
    } catch (error) {
      set({ error: error.message, loading: false }); // Update store with error
      console.error('Error signing up:', error);
      throw error; // Throw error to be caught in the calling function
    }
  },

  fetchOrganizationsCoaches: async () => {
    try {
      const data = await fetchOrganizationsCoaches();
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  sendOtp: async (contactNumber) => {
    set({ loading: true, error: null });
    try {
      const data = await sendOtp(contactNumber);
      set({ loading: false });
      return data; // Return the response to check for success
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error; // Propagate the error for handling in the component
    }
  },

  verifyOtp: async (otp,phone) => {
    set({ loading: true, error: null });
    try {
      const data = await verifyOtpApi(otp,phone); // Call the API to verify OTP
      set({ loading: false });
      return data; 
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error; 
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await logoutUser(); // Call the logout API
      set({ loading: false }); // Reset loading state
      return true; // Indicate success
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error; // Propagate error
    }
  },

}));

export const useLoginStore = create((set) => ({
  loginData: null,
  loading: false,
  error: null,

  // Function to fetch login data
  fetchLoginData: async (userLoginData) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchLoginData(userLoginData);
      set({ loginData: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error fetching login data:', error.message);
    }
  },
}));

