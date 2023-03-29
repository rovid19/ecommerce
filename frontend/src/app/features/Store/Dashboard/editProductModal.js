import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const editProductModalSlice = createSlice({
  name: "editProductModal",
  initialState,
  reducers: {
    setEditProductModal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEditProductModal } = editProductModalSlice.actions;

export default editProductModalSlice.reducer;
