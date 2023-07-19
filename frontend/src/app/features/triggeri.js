import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    inboxTrigger: false,
    fetchUserTrigger: false,
    runUseEffect: false,
    runSocket: false,
  },
};

export const triggeriSlice = createSlice({
  name: "triggeri",
  initialState,
  reducers: {
    setInboxTrigger: (state, action) => {
      state.value.inboxTrigger = action.payload;
    },
    setFetchUserTrigger: (state, action) => {
      state.value.fetchUserTrigger = action.payload;
    },
    setRunUseEffect: (state, action) => {
      state.value.runUseEffect = action.payload;
    },
    setSocket: (state, action) => {
      state.value.runUseEffect = action.payload;
    },
  },
});

export const {
  setInboxTrigger,
  setFetchUserTrigger,
  setRunUseEffect,
  setSocket,
} = triggeriSlice.actions;

export default triggeriSlice.reducer;
