import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    inboxTrigger: false,
    fetchUserTrigger: false,
    runUseEffect: false,
    runSocket: false,
    showNavbar: true,
    mobileActive: false,
    active: "",
    closeNavbar: false,
    productPicture: [],
    cartClassname:
      " bg-neutral-900  text-neutral-300 shadow-xl p-3 z-50 h-full w-full absolute right-0 top-0 zeze",
    triggerGetChat: false,
  },
};

export const triggeriSlice = createSlice({
  name: "triggeri",
  initialState,
  reducers: {
    setInboxTrigger: (state, action) => {
      state.value.inboxTrigger = action.payload;
    },
    setFetchUserTrigger: (state, action) => {
      state.value.fetchUserTrigger = action.payload;
    },
    setRunUseEffect: (state, action) => {
      state.value.runUseEffect = action.payload;
    },
    setSocket: (state, action) => {
      state.value.runUseEffect = action.payload;
    },
    setShowNavbar: (state, action) => {
      state.value.showNavbar = action.payload;
    },
    setMobileActive: (state, action) => {
      state.value.mobileActive = action.payload;
    },
    setActive: (state, action) => {
      state.value.active = action.payload;
    },
    setCloseNavbar: (state, action) => {
      state.value.closeNavbar = action.payload;
    },
    setProductPictures: (state, action) => {
      state.value.productPicture = action.payload;
    },
    setCartClassname: (state, action) => {
      state.value.cartClassname = action.payload;
    },
    setTriggerGetChat: (state, action) => {
      state.value.triggerGetChat = action.payload;
    },
  },
});

export const {
  setInboxTrigger,
  setFetchUserTrigger,
  setRunUseEffect,
  setSocket,
  setShowNavbar,
  setMobileActive,
  setActive,
  setCloseNavbar,
  setProductPictures,
  setCartClassname,
  setTriggerGetChat,
} = triggeriSlice.actions;

export default triggeriSlice.reducer;
