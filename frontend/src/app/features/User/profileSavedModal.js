import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const ProfileSavedModalSlice = createSlice({
  name: "profileSavedModal",
  initialState,
  reducers: {
    setUserProfileSavedModal: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserProfileSavedModal } = ProfileSavedModalSlice.actions;

export default ProfileSavedModalSlice.reducer;
