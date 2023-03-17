import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import registrationInputReducer from "./features/registrationInput.js";
import storeReducer from "./features/storeSlice.js";
import userTriggerReducer from "./features/getUserTrigger.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    registrationInput: registrationInputReducer,
    store: storeReducer,
    getUserTrigger: userTriggerReducer,
  },
});
