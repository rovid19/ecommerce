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
import StoreAddProducts from "./components/User/Dashboard/StoreAddProducts/StoreAddProducts.js";
import StoreFinance from "./components/User/Dashboard/StoreFinance/StoreFinance.js";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const App = () => {
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const user = useSelector((state) => state.user.value);
  const store = useSelector((state) => state.store.value);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/user/get-logged-user?timestamp=" + new Date().getTime(), {})
      .then(({ data }) => {
        dispatch(addUser(data));
      });
  }, [getUserTrigger]);
  console.log(user);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/store/:id" element={<Store />} />
        </Route>{" "}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/form" element={<RegisterPagePartTwo />} />
        <Route
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
            element={<StoreAddProducts />}
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
