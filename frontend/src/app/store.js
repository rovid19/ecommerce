import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import registrationInputReducer from "./features/registrationInput.js";
import storeReducer from "./features/storeSlice.js";
import userTriggerReducer from "./features/getUserTrigger.js";
import storeSubPageReducer from "./features/storeSubPage.js";
import storeProductsReducer from "./features/Store/storeProducts.js";
import isStoreDeleteVisibleReducer from "./features/Store/isStoreDeleteVisible.js";
import selectedProductReducer from "./features/Store/selectedProduct.js";
import isUserFetchingReducer from "./features/User/isUserFetching.js";
import editModeReducer from "./features/Store/storeEditMode.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    registrationInput: registrationInputReducer,
    store: storeReducer,
    getUserTrigger: userTriggerReducer,
    storeSubPage: storeSubPageReducer,
    storeProducts: storeProductsReducer,
    isStoreDeleteVisible: isStoreDeleteVisibleReducer,
    selectedProduct: selectedProductReducer,
    isUserFetching: isUserFetchingReducer,
    editMode: editModeReducer,
  },
});
