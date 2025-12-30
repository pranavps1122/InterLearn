import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "reviewer" | "student";
  is_active: boolean
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  authChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  authChecked: false,
};

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data.data.result;
    } catch {
      return rejectWithValue("unauthorized");
    }
  }

);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.authChecked = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.authChecked = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.authChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.authChecked = false;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.authChecked = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.authChecked = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.authChecked = true;
      });
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
