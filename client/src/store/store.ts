import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from './adminSlice'
import reviewerReducer from './reviewerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin:adminReducer,
    reviewer:reviewerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
