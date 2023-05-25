import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isReviewSlice = createSlice({
  name: "isReview",
  initialState,
  reducers: {
    setIsReview: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsReview } = isReviewSlice.actions;

export default isReviewSlice.reducer;
