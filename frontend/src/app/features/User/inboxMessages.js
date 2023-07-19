import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    allChat: 0,
    conversation: [],
  },
};

export const inboxMessagesSlice = createSlice({
  name: "inboxMessages",
  initialState,
  reducers: {
    setInboxMessages: (state, action) => {
      state.value.allChat = action.payload;
    },
    setConversation: (state, action) => {
      state.value.conversation = action.payload;
    },
  },
});

export const { setInboxMessages, setConversation } = inboxMessagesSlice.actions;

export default inboxMessagesSlice.reducer;
