import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const deleteProductModalSlice = createSlice({
  name: "deleteProductModal",
  initialState,
  reducers: {
    setStoreDeleteVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStoreDeleteVisible } = deleteProductModalSlice.actions;

export default deleteProductModalSlice.reducer;
