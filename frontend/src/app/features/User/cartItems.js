import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setCartItems } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
