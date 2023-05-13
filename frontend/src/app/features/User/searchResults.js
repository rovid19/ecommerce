import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchResults } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
