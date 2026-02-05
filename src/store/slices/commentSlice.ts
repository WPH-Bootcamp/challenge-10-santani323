import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "@/types/blog";

const initialState: Comment = {
  id: 0,
  like: "",
  comment: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    updateComment: (state, action: PayloadAction<Partial<Comment>>) => {
      if (action.payload.id) state.id = action.payload.id;
      if (action.payload.like) state.like = action.payload.like;
      if (action.payload.comment) state.comment = action.payload.comment;
    },
    clearComment: (state) => {
      state.id = 0;
      state.like = "";
      state.comment = [];
    },
  },
});
export const { updateComment, clearComment } = commentSlice.actions;

export default commentSlice.reducer;
