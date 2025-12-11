import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../api/axios";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminState {
  admin: Admin | null;
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

const storedAdmin = safeJSONParse(localStorage.getItem("admin"));
const storedAccessToken = (() => {
  const v = localStorage.getItem("adminToken");
  return v && v !== "undefined" ? v : null;
})();

const initialState: AdminState = {
  admin: storedAdmin,
  accessToken: storedAccessToken,
  isAuthenticated: Boolean(storedAccessToken),
};

export const performAdminLogout = createAsyncThunk(
  "admin/performAdminLogout",
  async (_, thunkAPI) => {
    try {
      await api.post("/admin/logout");
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginSuccess: (
      state,
      action: PayloadAction<{ admin: Admin; accessToken: string }>
    ) => {
      state.admin = action.payload.admin;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      localStorage.setItem("adminToken", action.payload.accessToken);
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = Boolean(action.payload);

      if (action.payload)
        localStorage.setItem("adminToken", action.payload);
      else
        localStorage.removeItem("adminToken");
    },

    adminLogout: (state) => {
      state.admin = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(performAdminLogout.fulfilled, (state) => {
      state.admin = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
    });

    builder.addCase(performAdminLogout.rejected, (state) => {
      state.admin = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
    });
  },
});

export const { adminLoginSuccess, adminLogout, setAccessToken } =
  adminSlice.actions;

export default adminSlice.reducer;
