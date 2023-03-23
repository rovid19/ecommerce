import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const storeSubPageSlice = createSlice({
  title: "storeSubPage",
  initialState,
  reducers: {
    getStoreSubPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getStoreSubPage } = storeSubPageSlice.actions;

export default storeSubPageSlice.reducer;
