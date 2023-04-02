import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const htmlElementSlice = createSlice({
  name: "htmlElement",
  initialState,
  reducers: {
    setHtmlElement: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setHtmlElement } = htmlElementSlice.actions;

export default htmlElementSlice.reducer;
