import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    postLiked: false,
  },
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    isLiked: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { isLiked } = postSlice.actions;
export default postSlice.reducer;
