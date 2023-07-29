import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    postModalVisible: false,
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostModalVisible: (state, action) => {
      state.value.postModalVisible = action.payload;
    },
  },
});

export const { setPostModalVisible } = postSlice.actions;
export default postSlice.reducer;
