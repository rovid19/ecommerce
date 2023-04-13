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

axios.defaults.baseURL = "http://localhost:4000";
//axios.defaults.baseURL = "https://ecommerce-api-px36.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const user = useSelector((state) => state.user.value);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const isUserFetching = useSelector((state) => state.isUserFetching.value);
  const dispatch = useDispatch();

  useEffect(() => {
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
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/store/:storeName" element={<Store />} />
          <Route
            path="/store/:storeName/:productId"
            element={<StoreProductModal />}
          />
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
        </Route>
      </Routes>
    </div>
  );
};

export default App;
