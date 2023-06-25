import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: Number,
};

export const scrollStopSlice = createSlice({
  name: "scrollStop",
  initialState,
  reducers: {
    setScrollStop: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setScrollStop } = scrollStopSlice.actions;

export default scrollStopSlice.reducer;
