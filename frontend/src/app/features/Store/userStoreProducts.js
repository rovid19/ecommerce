import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const userStoreProductSlice = createSlice({
  name: "userStoreProducts",
  initialState,
  reducers: {
    setStoreProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStoreProducts } = userStoreProductSlice.actions;

export default userStoreProductSlice.reducer;
