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
    removeCartItem: (state, action) => {
      state.value.splice(action.payload, 1);
    },
  },
});

export const { setCartItems, removeCartItem } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
