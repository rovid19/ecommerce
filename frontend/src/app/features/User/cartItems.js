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
      let newArray = [...state.value];

      newArray.splice(action.payload, 1);

      return {
        ...state,
        value: [...newArray],
      };
    },
  },
});

export const { setCartItems, removeCartItem } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
