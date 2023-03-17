import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addStore } = storeSlice.actions;
export default storeSlice.reducer;
