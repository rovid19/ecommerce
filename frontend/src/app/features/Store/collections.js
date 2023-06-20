import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  collectionItems: [],
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    collectionVisible: (state, action) => {
      state.value = action.payload;
    },
    addCollectionItems: (state, action) => {
      state.collectionItems = action.payload;
    },
  },
});

export const { collectionVisible, addCollectionItems } =
  collectionSlice.actions;

export default collectionSlice.reducer;
