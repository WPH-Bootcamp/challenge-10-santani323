import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, ProfileState } from "@/types/users";

const initialState: ProfileState = {
  id: 0,
  name: "",
  avatarPublicId: "",
  avatarUrl: "",
  email: "",
  username: "",
  user: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.avatarUrl = action.payload.avatarUrl ?? state.avatarUrl;
      state.username = action.payload.name ?? state.username;
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

export const { updateUser, setError, clearError, clearUser } =
  profileSlice.actions;

export default profileSlice.reducer;
