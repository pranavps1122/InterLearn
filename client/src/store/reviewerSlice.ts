import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Reviewer Interface
interface Reviewer {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ReviewerState {
  reviewer: Reviewer | null;
  token: string | null;
  isAuthenticated: boolean;
}

// SAFE PARSE (to avoid "undefined" JSON errors)
const safeJSONParse = (value: string | null) => {
  if (!value || value === "undefined" || value === "null") return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const initialState: ReviewerState = {
  reviewer: safeJSONParse(localStorage.getItem("reviewer")),
  token:
    localStorage.getItem("reviewerToken") &&
    localStorage.getItem("reviewerToken") !== "undefined"
      ? localStorage.getItem("reviewerToken")
      : null,
  isAuthenticated:
    !!localStorage.getItem("reviewerToken") &&
    localStorage.getItem("reviewerToken") !== "undefined",
};

const reviewerSlice = createSlice({
  name: "reviewer",
  initialState,
  reducers: {
    reviewerLoginSuccess(
      state,
      action: PayloadAction<{ reviewer: Reviewer; token: string }>
    ) {
      state.reviewer = action.payload.reviewer;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Store safely
      localStorage.setItem(
        "reviewer",
        JSON.stringify(action.payload.reviewer)
      );
      localStorage.setItem("reviewerToken", action.payload.token);
    },

    reviewerLogout(state) {
      state.reviewer = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("reviewer");
      localStorage.removeItem("reviewerToken");
    },
  },
});

export const { reviewerLoginSuccess, reviewerLogout } = reviewerSlice.actions;
export default reviewerSlice.reducer;
