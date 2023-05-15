import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const openReviewPicSlice = createSlice({
  name: "openReviewPic",
  initialState,
  reducers: {
    setOpenReviewPic: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setOpenReviewPic } = openReviewPicSlice.actions;

export default openReviewPicSlice.reducer;
