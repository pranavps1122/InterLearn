import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AdminState = {
  admin: JSON.parse(localStorage.getItem("admin") || "null"),
  token: localStorage.getItem("adminToken"),
  isAuthenticated: !!localStorage.getItem("adminToken"),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginSuccess(
      state,
      action: PayloadAction<{ admin: Admin; token: string }>
    ) {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      localStorage.setItem("adminToken", action.payload.token);
    },

    adminLogout(state) {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
    },
  },
});

export const { adminLoginSuccess, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
