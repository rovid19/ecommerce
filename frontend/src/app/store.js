import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js";
import registrationInputReducer from "./features/registrationInput.js";
import storeReducer from "./features/storeSlice.js";
import userTriggerReducer from "./features/getUserTrigger.js";
import storeSubPageReducer from "./features/storeSubPage.js";
import storeProductsReducer from "./features/Store/storeProducts.js";
import deleteProductModalReducer from "./features/Store/deleteProductModal.js";
import selectedProductReducer from "./features/Store/selectedProduct.js";
import isUserFetchingReducer from "./features/User/isUserFetching.js";
import editModeReducer from "./features/Store/storeEditMode.js";
import editProductModalReducer from "./features/Store/Dashboard/editProductModal.js";
import htmlElementReducer from "./features/Store/htmlElement.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    registrationInput: registrationInputReducer,
    store: storeReducer,
    getUserTrigger: userTriggerReducer,
    storeSubPage: storeSubPageReducer,
    storeProducts: storeProductsReducer,
    deleteProductModal: deleteProductModalReducer,
    selectedProduct: selectedProductReducer,
    isUserFetching: isUserFetchingReducer,
    editMode: editModeReducer,
    editProductModal: editProductModalReducer,
    htmlElement: htmlElementReducer,
  },
});
