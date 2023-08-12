import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    postModalVisible: false,
    postModalClass:
      "h-[100%] w-[90%] lg:w-[70%] bg-neutral-900  relative rounded-md p-4 overflow-scroll scrollbar-hide",
    comPostDelete: "",
    postTrigger: false,
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostModalVisible: (state, action) => {
      state.value.postModalVisible = action.payload;
    },
    setPostModalClass: (state, action) => {
      state.value.postModalClass = action.payload;
    },
    setPostModalClose: (state, action) => {
      state.value.postModalClass = state.value.postModalClass.replace(
        "postModalOpen",
        action
      );
    },
    setPostModalReset: (state, action) => {
      state.value.postModalClass = state.value.postModalClass.replace(
        "postModalClose",
        action
      );
    },
    setComPostDelete: (state, action) => {
      state.value.comPostDelete = action.payload;
    },
    setPostTrigger: (state, action) => {
      state.value.postTrigger = action.payload;
    },
  },
});

export const {
  setPostModalVisible,
  setPostModalClass,
  setPostModalClose,
  setPostModalReset,
  setComPostDelete,
  setPostTrigger,
} = postSlice.actions;
export default postSlice.reducer;
