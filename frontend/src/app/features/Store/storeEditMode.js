import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const editModeSlice = createSlice({
  name: "editMode",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEditMode } = editModeSlice.actions;

export default editModeSlice.reducer;
