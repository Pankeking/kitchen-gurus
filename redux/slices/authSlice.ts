import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  email: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
    },
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signUp, signIn, signOut, setLoading, setError, clearError } = authSlice.actions;
export default authSlice;