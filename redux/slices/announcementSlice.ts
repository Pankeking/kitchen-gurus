import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  announcements: [],
  loading: false,
  error: null,
};

const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    addAnnouncement: (state, action) => {
      state.announcements.push(action.payload);
    },
    removeAnnouncement: (state, action) => {
      state.announcements = state.announcements.filter(announcement => announcement.id !== action.payload);
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

export const { addAnnouncement, removeAnnouncement, setLoading, setError, clearError } = announcementSlice.actions;
export default announcementSlice;
