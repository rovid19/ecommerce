import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addSelectedProduct: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
