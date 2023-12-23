import { createSlice } from '@reduxjs/toolkit';


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
    reload: boolean;
}

  const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    initialized: false,
    reload: false
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
    nullifyUser: (state) => {
      if (state.user) {
        state.user.uid = "";
        state.user.displayName = "";
        state.user.profilePhoto = "";
        state.user.backgroundPhoto = "";
      }
    },
    reloadify: (state) => {
      state.reload = !state.reload;
    }
  },
});

export const selectProfilePhoto = (state:AuthState) => state.user?.profilePhoto;
export const selectBackgroundPhoto = (state:AuthState) => state.user?.backgroundPhoto;
export const selectUser = (state:AuthState) => state.user;
export const selectUserId = (state:AuthState) => state.user?.uid;


export const { setUser, setInitialized, nullifyUser, reloadify } = authSlice.actions;

export default authSlice;