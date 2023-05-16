import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const viewImageSlice = createSlice({
  name: "viewImage",
  initialState,
  reducers: {
    setviewImage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setviewImage } = viewImageSlice.actions;

export default viewImageSlice.reducer;
