import { ActionCreator, PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  uid: string;
  email: string;
}

interface AuthState  {
    user: User | null;
    isLoggedIn: boolean;
    initialized: boolean;
}

const initialState = {
  user: null,
  isLoggedIn: false,
  initialized: false,
};

const authSlice = createSlice<AuthState, any>({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signIn: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signOut: (state: AuthState) => {
      state.user = null;
    },
  },
});


export const setLoading = authSlice.actions.setLoading as ActionCreator<PayloadAction<boolean>>;
export const signUp = authSlice.actions.signUp as ActionCreator<PayloadAction<User>>;
export const signIn = authSlice.actions.signIn as ActionCreator<PayloadAction<User>>;
export const signOut = authSlice.actions.signOut as ActionCreator<PayloadAction<null>>;
export default authSlice;