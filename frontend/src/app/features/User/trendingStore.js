import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  store: {},
};

//

export const fetchTrendingStore = createAsyncThunk(
  "trendingStore/fetchTrendingStore",
  async () => {
    const response = await axios.get("/api/store/get-trending-store");
    return response.data;
  }
);

export const trendingStoreSlice = createSlice({
  name: "trendingStore",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.store = action.payload;
    },
  },
  extraReducers: {
    [fetchTrendingStore.fulfilled]: (state, action) => {
      state.store = action.payload;
    },
  },
});

export const { addStore } = trendingStoreSlice.actions;

export default trendingStoreSlice.reducer;
