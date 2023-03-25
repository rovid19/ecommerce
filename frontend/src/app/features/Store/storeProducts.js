import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const storeProductSlice = createSlice({
  name: "storeProducts",
  initialState,
  reducers: {
    addStoreProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addStoreProducts } = storeProductSlice.actions;

export default storeProductSlice.reducer;
