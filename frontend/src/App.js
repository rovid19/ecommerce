import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.js";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import RegisterPagePartTwo from "./components/Register/RegisterPagePartTwo.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./app/features/userSlice.js";
import StoreDashboard from "./components/User/Dashboard/StoreDashboard.js";
import Store from "./components/User/Store/Store.js";
import StoreEdit from "../src/components/User/Dashboard/StoreEdit/StoreEdit.js";
import StoreYourProducts from "../src/components/User/Dashboard/StoreYourProducts/YourProducts.js";
import StoreFinance from "./components/User/Dashboard/StoreFinance/StoreFinance.js";
import { addStoreProducts } from "./app/features/Store/storeProducts.js";
import { setUserFetching } from "./app/features/User/isUserFetching.js";
import StoreProductModal from "./components/User/Store/StoreProductModal/StoreProductModal.js";
import AddToCart from "./components/User/Customer/AddToCart.js";
import Layout from "./components/Layout.js";
import UserMenu from "./components/User/Customer/Profile/UserMenu.js";
import StoreOrders from "./components/User/Dashboard/StoreOrders/StoreOrders.js";

axios.defaults.baseURL = "http://localhost:4000";
//axios.defaults.baseURL = "https://ecommerce-api-px36.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const cartVisible = useSelector((state) => state.cartVisible.value);
  const user = useSelector((state) => state.user.value);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const isUserFetching = useSelector((state) => state.isUserFetching.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("pokrenut");
    dispatch(setUserFetching(true));
    axios
      .get("/api/user/get-logged-user?timestamp=" + new Date().getTime(), {})
      .then(({ data }) => {
        dispatch(addUser(data));
      });

    axios
      .get(
        "/api/store/get-store-products?timestamp=" + new Date().getTime(),
        {}
      )
      .then(({ data }) => {
        dispatch(addStoreProducts(data.storeProducts));
      })
      .then(() => dispatch(setUserFetching(false)));
  }, [getUserTrigger]);
  console.log(user);
  return (
    <div>
      {cartVisible && <AddToCart />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/store/:storeName/:storeid" element={<Store />} />
          <Route
            path="/store/:storeName/product/:productId"
            element={<StoreProductModal />}
          />
          <Route path="/:id/profile" element={<UserMenu />}></Route>
          <Route path="/:id/orderhistory" element={<UserMenu />}></Route>
          <Route path="/:id/shippingdetails" element={<UserMenu />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/form" element={<RegisterPagePartTwo />} />
        <Route
          exact
          path="/dashboard/:storename"
          element={
            <>
              <StoreDashboard />
              <StoreEdit />
            </>
          }
        >
          <Route
            path="/dashboard/:storename/products"
            element={<StoreYourProducts />}
          />
          <Route
            path="/dashboard/:storename/finance"
            element={<StoreFinance />}
          />
          7
          <Route
            path="/dashboard/:storename/orders"
            element={<StoreOrders />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
