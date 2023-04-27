import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const savedStoreSlice = createSlice({
  name: "savedStore",
  initialState,
  reducers: {
    setSavedStore: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSavedStore } = savedStoreSlice.actions;

export default savedStoreSlice.reducer;
