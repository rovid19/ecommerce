import { configureStore } from "@reduxjs/toolkit";
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
import viewProductModalReducer from "./features/Store/viewProductModal.js";
import cartVisibleReducer from "./features/User/cartVisible.js";
import ProfileSavedModalReducer from "./features/User/profileSavedModal.js";
import cartItemsReducer from "./features/User/cartItems.js";
import storeIdReducer from "./features/Store/storeId.js";
import productIndexReducer from "./features/User/productIndex.js";
import savedStoreReducer from "./features/Store/savedStore.js";
import searchReducer from "./features/User/search.js";
import openReviewPicReducer from "./features/User/openReviewPic.js";
import reviewPicReducer from "./features/User/reviewPic.js";
import userStoreProductsReducer from "./features/Store/userStoreProducts.js";
import viewReviewPicReducer from "./features/User/viewReviewPic.js";
import viewImageReducer from "./features/User/viewImage.js";
import isReviewReducer from "./features/User/isReview.js";
import userDataReducer from "./features/User/userSlice.js";
import trendingStoreReducer from "./features/User/trendingStore.js";
import collectionReducer from "./features/Store/collections.js";
import scrollStopReducer from "./features/Store/scrollStop.js";
import triggeriReducer from "./features/triggeri.js";
import inboxMessagesReducer from "./features/User/inboxMessages.js";
export const store = configureStore({
  reducer: {
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
    viewProductModal: viewProductModalReducer,
    cartVisible: cartVisibleReducer,
    profileSavedModal: ProfileSavedModalReducer,
    cartItems: cartItemsReducer,
    storeId: storeIdReducer,
    productIndex: productIndexReducer,
    savedStore: savedStoreReducer,
    search: searchReducer,
    openReviewPic: openReviewPicReducer,
    reviewPic: reviewPicReducer,
    userStoreProducts: userStoreProductsReducer,
    viewReviewPic: viewReviewPicReducer,
    viewImage: viewImageReducer,
    isReview: isReviewReducer,
    userData: userDataReducer,
    trendingStore: trendingStoreReducer,
    collection: collectionReducer,
    scrollStop: scrollStopReducer,
    triggeri: triggeriReducer,
    inboxMessages: inboxMessagesReducer,
  },
});
