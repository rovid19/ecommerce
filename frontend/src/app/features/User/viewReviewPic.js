import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const viewReviewPicSlice = createSlice({
  name: "viewReviewPic",
  initialState,
  reducers: {
    setViewReviewPic: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setViewReviewPic } = viewReviewPicSlice.actions;

export default viewReviewPicSlice.reducer;
