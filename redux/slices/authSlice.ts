import { createSlice } from '@reduxjs/toolkit';

interface FirebaseUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  isAnonymous: boolean;
}

interface AuthState {
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
    }
  },
});

export const selectUser = (state:any) => state.user;


export const { setUser, setInitialized } = authSlice.actions;


// const unsub = onAuthStateChanged(FBauth, (user) => {
//   console.log("On auth state changed", user);
//   dispatch(setUser(user));
//   dispatch(setInitialized(true));
// });

export default authSlice;