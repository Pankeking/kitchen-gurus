import { ActionCreator, PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
}

interface Error {
  code: string;
  name: string;
}

interface AuthState {
  user: User | null;
  email: string | null;
  loading: boolean;
  error: Error | null;
}

const initialState = {
  user: null,
  email: null,
  loading: false,
  error: null,
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
    setLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: AuthState, action: PayloadAction<Error>) => {
      const error = action.payload;
      state.error = error;
    },
    clearError: (state: AuthState) => {
      state.error = null;
    },
  },
});


export const setLoading = authSlice.actions.setLoading as ActionCreator<PayloadAction<boolean>>;
export const setError = authSlice.actions.setError as ActionCreator<PayloadAction<Error>>
export const clearError = authSlice.actions.clearError as ActionCreator<PayloadAction<null>>;
export const signUp = authSlice.actions.signUp as ActionCreator<PayloadAction<User>>;
export const signIn = authSlice.actions.signIn as ActionCreator<PayloadAction<User>>;
export const signOut = authSlice.actions.signOut as ActionCreator<PayloadAction<null>>;
export default authSlice;