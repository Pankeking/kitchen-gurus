import { configureStore } from "@reduxjs/toolkit" 
import authSlice from './slices/authSlice';
import requestSlice from "./slices/requestSlice";
import announcementSlice from "./slices/announcementSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    request: requestSlice.reducer,
    announcement: announcementSlice.reducer
  }
})

export default store;