import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    collectionVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { collectionVisible } = collectionSlice.actions;

export default collectionSlice.reducer;
