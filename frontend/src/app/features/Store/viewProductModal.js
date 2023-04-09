import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const viewProductModalSlice = createSlice({
  name: "deleteProductModal",
  initialState,
  reducers: {
    setViewProductModal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setViewProductModal } = viewProductModalSlice.actions;

export default viewProductModalSlice.reducer;
