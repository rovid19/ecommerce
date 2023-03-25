import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isStoreDeleteVisibleSlice = createSlice({
  name: "isStoreDeleteVisible",
  initialState,
  reducers: {
    setStoreDeleteVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStoreDeleteVisible } = isStoreDeleteVisibleSlice.actions;

export default isStoreDeleteVisibleSlice.reducer;
