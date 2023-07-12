import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    allChat: 0,
  },
};

export const inboxMessagesSlice = createSlice({
  name: "inboxMessages",
  initialState,
  reducers: {
    setInboxMessages: (state, action) => {
      state.value.allChat = action.payload;
    },
  },
});

export const { setInboxMessages } = inboxMessagesSlice.actions;

export default inboxMessagesSlice.reducer;
