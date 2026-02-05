import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import commentReducer from "./slices/commentSlice";
import artikelRecucer from "@/store/slices/articelSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    comment: commentReducer,
    article: artikelRecucer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
