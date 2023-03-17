import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const getUserTriggerSlice = createSlice({
  name: "getUserTrigger",
  initialState,
  reducers: {
    switchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { switchValue } = getUserTriggerSlice.actions;

export default getUserTriggerSlice.reducer;
