import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const productIndexSlice = createSlice({
  name: "productIndex",
  initialState,
  reducers: {
    setProductIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProductIndex } = productIndexSlice.actions;

export default productIndexSlice.reducer;
