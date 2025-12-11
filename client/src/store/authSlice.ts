// src/store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../api/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const safeJSONParse = (value: string | null) => {
  if (!value || value === "undefined" || value === "null") return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const storedUser = safeJSONParse(localStorage.getItem("user"));
const storedAccessToken = (() => {
  const v = localStorage.getItem("accessToken");
  return v && v !== "undefined" ? v : null;
})();

const initialState: AuthState = {
  user: storedUser,
  accessToken: storedAccessToken,
  isAuthenticated: Boolean(storedAccessToken),
};

export const performLogout = createAsyncThunk("auth/performLogout", async (_, thunkAPI) => {
  try {
    await api.post("/auth/logout"); 
    return true;
  } catch (err) {
   
    return thunkAPI.rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      if (action.payload) localStorage.setItem("accessToken", action.payload);
      else localStorage.removeItem("accessToken");
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(performLogout.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    });
    builder.addCase(performLogout.rejected, (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    });
  },
});

export const { loginSuccess, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
