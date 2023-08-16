import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import RegisterPagePartTwo from "./components/Register/RegisterPagePartTwo.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import StoreDashboard from "./components/User/Dashboard/StoreDashboard.js";
import Store from "./components/User/Store/Store.js";
import StoreEdit from "../src/components/User/Dashboard/StoreEdit/StoreEdit.js";
import StoreYourProducts from "../src/components/User/Dashboard/StoreYourProducts/YourProducts.js";
import StoreFinance from "./components/User/Dashboard/StoreFinance/StoreFinance.js";
import storeProducts, {
  addStoreProducts,
} from "./app/features/Store/storeProducts.js";
import { setUserFetching } from "./app/features/User/isUserFetching.js";
import StoreProductModal from "./components/User/Store/StoreProductModal/StoreProductModal.js";
import AddToCart from "./components/User/Customer/AddToCart.js";
import Layout from "./components/Layout.js";
import UserMenu from "./components/User/Customer/Profile/UserMenu.js";
import StoreOrders from "./components/User/Dashboard/StoreOrders/StoreOrders.js";
import SearchResults from "./components/Search/SearchResults.js";
import { setStoreProducts } from "./app/features/Store/userStoreProducts.js";
import Homepage from "./components/Homepage/Homepage.js";
import {
  fetchStoreProducts,
  fetchUserData,
  userData,
} from "./app/features/User/userSlice.js";
import OrderHistory from "./components/User/Customer/Profile/ProfileSubpages/OrderHistory.js";
import Profile from "./components/User/Customer/Profile/ProfileSubpages/Profile.js";
import ShippingDetails from "./components/User/Customer/Profile/ProfileSubpages/ShippingDetails.js";
import Search from "./components/Search/Search.js";
import Inbox from "./components/User/Inbox/Inbox.js";
import { io } from "socket.io-client";
import inboxMessages, {
  setInboxMessages,
} from "./app/features/User/inboxMessages";
import { setInboxTrigger, setRunUseEffect } from "./app/features/triggeri";
import Chat from "./components/User/Inbox/Chat";
import { setSocket } from "./app/features/socket";
import YourFeed from "./components/Homepage/YourFeed";

axios.defaults.baseURL = "http://localhost:4000";
//axios.defaults.baseURL = "https://ecommerce-api-px36.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const cartVisible = useSelector((state) => state.cartVisible.value);
  const cartClassname = useSelector(
    (state) => state.triggeri.value.cartClassname
  );
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const inboxMessages = useSelector(
    (state) => state.inboxMessages.value.allChat
  );
  const fetchUserTrigger = useSelector(
    (state) => state.triggeri.value.fetchUserTrigger
  );

  const userData = useSelector((state) => state.userData.value.user);
  const userData2 = useSelector((state) => state.userData.value.products);
  const socket = useSelector((state) => state.socket.value);
  const runUseEffect = useSelector(
    (state) => state.triggeri.value.runUseEffect
  );
  const dispatch = useDispatch();

  //konektaj socket ak ne postoji
  useEffect(() => {
    if (userData && Object.keys(socket).length === 0) {
      const sockett = io.connect("http://localhost:4005");
      dispatch(setSocket(sockett));

      return () => {
        sockett.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    async function da() {
      await dispatch(fetchUserData()).unwrap();
      if (userData && Object.keys(userData).length > 0) {
        dispatch(fetchStoreProducts());
        dispatch(setRunUseEffect(true));
      }
    }
    da();
  }, []);
  useEffect(() => {
    if (runUseEffect) {
      console.log("da pokrenulo se je");
      let totalCount = 0;
      userData.allChat.forEach((item) => {
        const zbroj = item.newChatCount - item.oldChatCount;

        totalCount += zbroj;

        console.log(zbroj);
      });

      dispatch(setInboxMessages(totalCount));
      dispatch(setRunUseEffect(false));
    }
  }, [runUseEffect]);

  //live notifikacije za poruke
  useEffect(() => {
    if (socket.connected === true) {
      socket.on("newChat", async () => {
        await dispatch(fetchUserData()).unwrap();
        dispatch(setRunUseEffect(true));
      });
    }
  }, [inboxMessages]);
  console.log(userData);
  return (
    <div>
      {cartVisible && (
        <div className="w-[50%] lg:w-[18%] absolute h-[100%] right-0">
          {" "}
          <AddToCart />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/store/:storeName/:storeid" element={<Store />} />
          <Route
            path="/store/:storeName/product/:productId"
            element={<StoreProductModal />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myorders" element={<OrderHistory />} />
          <Route path="/shippingdetails" element={<ShippingDetails />} />

          <Route path="/search" element={<Search />}>
            <Route
              path="/search/:searchOption/:searchValue"
              element={<SearchResults />}
            />
          </Route>

          <Route path="/inbox" element={<Inbox />}>
            <Route path="/inbox/:chatid" element={<Chat />} />{" "}
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPagePartTwo />} />

        <Route
          exact
          path="/dashboard/:storename/"
          element={
            <>
              <StoreDashboard />
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
