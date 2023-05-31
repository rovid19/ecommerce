import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: {
    user: {},
    status: {},
    error: {},
  },
};
export const fetchUserData = createAsyncThunk("user/fetchUserData", () => {
  return axios.get(
    "/api/user/get-logged-user?timestamp=" + new Date().getTime(),
    {}
  );
});
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addUserDva: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      console.log("ok");
    },
    [fetchUserData.fulfilled]: (state, action) => {
      console.log("ok");
      state.value = action.payload;
    },
    [fetchUserData.rejected]: (state) => {},
  },
});

export const userData = (state) => state.userData.user;

export const { addUserDva } = userDataSlice.actions;

export default userDataSlice.reducer;
