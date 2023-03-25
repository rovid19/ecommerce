import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isUserFetchingSlice = createSlice({
  name: "isUserFetching",
  initialState,
  reducers: {
    setUserFetching: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserFetching } = isUserFetchingSlice.actions;

export default isUserFetchingSlice.reducer;
