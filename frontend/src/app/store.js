import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import registrationInputReducer from "./features/registrationInput.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    registrationInput: registrationInputReducer,
  },
});
