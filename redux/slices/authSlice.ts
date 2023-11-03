import { createSlice } from '@reduxjs/toolkit';
import { ImageURISource } from 'react-native';


interface FirebaseUser {
  uid: string;
  displayName: string;
  profilePhoto?: any;
  backgroundPhoto?: any;
}

export interface AuthState {
    user: FirebaseUser | null;
    isLoggedIn: boolean;
    initialized: boolean;
}

  const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    initialized: false,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = action.payload ? true : false;
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
  },
});

export const selectProfilePhoto = (state:AuthState) => state.user?.profilePhoto;
export const selectBackgroundPhoto = (state:AuthState) => state.user?.backgroundPhoto;
export const selectUser = (state:AuthState) => state.user;
export const selectUserId = (state:AuthState) => state.user?.uid;


export const { setUser, setInitialized } = authSlice.actions;


// const unsub = onAuthStateChanged(FBauth, (user) => {
//   console.log("On auth state changed", user);
//   dispatch(setUser(user));
//   dispatch(setInitialized(true));
// });

export default authSlice;