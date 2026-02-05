import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ArticleDetailResponse } from "@/types/blog";

const initialState: ArticleDetailResponse = {
  id: 0,  
    title: "",
    content: "",
    tags: [],
    imageUrl: "",
    imagePublicId: "",
    createdAt: "",
    likes: 0,
    comments: 0,
    author: {
      id: 0,
      name: "",
      email: "",
    },
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    updateArticle: (state, action: PayloadAction<Partial<ArticleDetailResponse>>) => {
        console.log("articleSlice - updateArticle action.payload:", action.payload);
        
      Object.assign(state, action.payload);
    },
    clearArticle: (state) => {
      state.id = 0; 
    },
  },
});
export const { updateArticle, clearArticle } = articleSlice.actions;

export default articleSlice.reducer;
