import { configureStore } from "@reduxjs/toolkit" 
import authSlice from './slices/authSlice';
import requestSlice from "./slices/requestSlice";
import announcementSlice from "./slices/announcementSlice";
import contentSlice from "./slices/contentSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    request: requestSlice.reducer,
    announcement: announcementSlice.reducer,
    content: contentSlice.reducer,
  }
})

export default store;