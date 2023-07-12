import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    inboxTrigger: false,
    fetchUserTrigger: false,
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
  },
});

export const { setInboxTrigger, setFetchUserTrigger } = triggeriSlice.actions;

export default triggeriSlice.reducer;
