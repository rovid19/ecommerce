import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: {
    user: {},
    products: {},
    status: false,
    error: {},
  },
};

//

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await axios.get(
      "/api/user/get-logged-user?timestamp=" + new Date().getTime(),
      {}
    );
    return response.data;
  }
);

export const fetchStoreProducts = createAsyncThunk(
  "user/fetchStoreProducts",
  async () => {
    const response = await axios.get("/api/store/get-store-products");
    return response.data;
  }
);

//
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.user = action.payload;
    },
    setProducts: (state, action) => {
      state.value.products = action.payload;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      console.log("ok");
      state.value.status = true;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      console.log("ok");
      state.value.user = action.payload;
      state.value.status = false;
    },
    [fetchUserData.rejected]: (state) => {},

    [fetchStoreProducts.fulfilled]: (state, action) => {
      state.value.products = action.payload;
    },
  },
});

export const { addUser, setProducts } = userDataSlice.actions;

export default userDataSlice.reducer;
