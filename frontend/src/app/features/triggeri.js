import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    inboxTrigger: false,
  },
};

export const triggeriSlice = createSlice({
  name: "triggeri",
  initialState,
  reducers: {
    inboxTrigger: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { inboxTrigger } = triggeriSlice.actions;

export default triggeriSlice.reducer;
