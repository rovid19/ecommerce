import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const storeIdSlice = createSlice({
  name: "storeId",
  initialState,
  reducers: {
    setStoreId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStoreId } = storeIdSlice.actions;

export default storeIdSlice.reducer;
