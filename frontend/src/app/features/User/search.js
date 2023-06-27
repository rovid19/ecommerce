import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    search: "",
    searchOption: "",
    searchResults: [],
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.value.search = action.payload;
    },
    setSearchOption: (state, action) => {
      state.value.searchOption = action.payload;
    },
    setSearchResults: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearch, setSearchOption, setSearchResults } =
  searchSlice.actions;

export default searchSlice.reducer;
