import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    search: "",
    searchOption: "",
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
  },
});

export const { setSearch, setSearchOption } = searchSlice.actions;

export default searchSlice.reducer;
