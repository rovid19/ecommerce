import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const reviewPicSlice = createSlice({
  name: "reviewPic",
  initialState,
  reducers: {
    setReviewPic: (state, action) => {
      state.value.push(action.payload);
    },
    removePic: (state, action) => {
      state.value = action.payload;
    },
    removeSecificPic: (state, action) => {
      state.value.splice(action.payload, 1);
    },
  },
});

export const { setReviewPic, removePic, removeSecificPic } =
  reviewPicSlice.actions;

export default reviewPicSlice.reducer;
