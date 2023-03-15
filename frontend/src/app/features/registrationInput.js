import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const registrationInput = createSlice({
  name: "registrationInput",
  initialState,
  reducers: {
    addInput: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addInput } = registrationInput.actions;
export default registrationInput.reducer;
