import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage, { handleLogin } from "./components/Login/LoginPage";
import RegisterPagePartTwo from "./components/Register/RegisterPagePartTwo.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import StoreDashboard from "./components/User/Dashboard/StoreDashboard.js";
import Store from "./components/User/Store/Store.js";
import StoreYourProducts from "../src/components/User/Dashboard/StoreYourProducts/YourProducts.js";
import StoreFinance from "./components/User/Dashboard/StoreFinance/StoreFinance.js";
import StoreProductModal from "./components/User/Store/StoreProductModal/StoreProductModal.js";
import AddToCart from "./components/User/Customer/AddToCart.js";
import Layout from "./components/Layout.js";
import StoreOrders from "./components/User/Dashboard/StoreOrders/StoreOrders.js";
import SearchResults from "./components/Search/SearchResults.js";
import Homepage from "./components/Homepage/Homepage.js";
import {
  fetchStoreProducts,
  fetchUserData,
} from "./app/features/User/userSlice.js";
import OrderHistory from "./components/User/Customer/Profile/ProfileSubpages/OrderHistory.js";
import Profile from "./components/User/Customer/Profile/ProfileSubpages/Profile.js";
import ShippingDetails from "./components/User/Customer/Profile/ProfileSubpages/ShippingDetails.js";
import Search from "./components/Search/Search.js";
import Inbox from "./components/User/Inbox/Inbox.js";
import { io } from "socket.io-client";
import { setInboxMessages } from "./app/features/User/inboxMessages";
import { setActive, setRunUseEffect } from "./app/features/triggeri";
import Chat from "./components/User/Inbox/Chat";
import { setSocket } from "./app/features/socket";
import { getStoreSubPage } from "./app/features/storeSubPage.js";

//axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://ecommerce-production.up.railway.app";
axios.defaults.withCredentials = true;

const App = () => {
  // REDUX
  const cartVisible = useSelector((state) => state.cartVisible.value);
  const userData = useSelector((state) => state.userData.value.user);
  const socket = useSelector((state) => state.socket.value);
  const runUseEffect = useSelector(
    (state) => state.triggeri.value.runUseEffect
  );
  const inboxMessages = useSelector(
    (state) => state.inboxMessages.value.allChat
  );

  // OTHER
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // USEEFFECTS
  //konektaj socket ak ne postoji
  useEffect(() => {
    if (userData && Object.keys(socket).length === 0) {
      const sockett = io.connect("https://ecommerce-production.up.railway.app");
      dispatch(setSocket(sockett));

      return () => {
        sockett.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchUserData()).unwrap();
      if (Object.keys(userData).length === 0) {
        console.log("yes");
        await axios.post("/api/auth/login-user", {
          email: "DemoAccount@gmail.com",
          password: "123123",
        });

        await dispatch(fetchUserData()).unwrap();
        dispatch(fetchStoreProducts());
        dispatch(getStoreSubPage("homepage"));
        dispatch(setRunUseEffect(true));
        dispatch(setActive(null));
        navigate("/");
      } else {
        dispatch(fetchStoreProducts());
        dispatch(setRunUseEffect(true));
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    if (runUseEffect) {
      let totalCount = 0;
      userData.allChat.forEach((item) => {
        const zbroj = item.newChatCount - item.oldChatCount;

        totalCount += zbroj;
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
        <div className="w-[50%] lg:w-[22%] xl:w-[20%] 2xl:w-[18%] absolute h-[100%] right-0">
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
