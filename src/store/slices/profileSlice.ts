import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  headline: string;
  avatar?: string;
  bio?: string;
}

interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setUser,
  updateUser,
  setError,
  clearError,
  clearUser,
} = profileSlice.actions;

export default profileSlice.reducer;
