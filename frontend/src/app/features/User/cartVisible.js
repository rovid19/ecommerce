import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const cartVisibleSlice = createSlice({
  name: "cartVisible",
  initialState,
  reducers: {
    setCartVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCartVisible } = cartVisibleSlice.actions;

export default cartVisibleSlice.reducer;
