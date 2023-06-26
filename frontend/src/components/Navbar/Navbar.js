import React, { useState } from "react";
import Img from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NavbarUserMenu from "./NavbarUserMenu";
import { getStoreSubPage } from "../../app/features/storeSubPage";
import axios from "axios";
import { setSearchResults } from "../../app/features/User/searchResults";
import { setSearch, setSearchOption } from "../../app/features/User/search";
import {
  Dashboard,
  Home,
  Search,
  Inbox,
  MyOrders,
  MyStore,
  ProfileSettings,
  ShippingDetails,
  Logout,
} from "./Icons/IconsExport";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [option, setOption] = useState("Stores");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.value.user);

  function handleSearch() {
    axios
      .post("/api/customer/search", { searchValue, option })
      .then(({ data }) => {
        navigate(`/search/${option}/${searchValue}`);
        dispatch(setSearchResults(data));
        dispatch(setSearch(searchValue));
        dispatch(setSearchOption(option));
      });
  }

  return (
    <>
      <main className="flex h-full w-full justify-center z-50 bg-black items-center shadow-md  ">
        {/* FIRST PART OF HEADER */}
        <header className="h-full w-[100%] bg-black">
          <div className="h-[15%] w-full grid place-items-center">
            <h1 className="font-bold text-gray-300 cursor-pointer">
              Rock's market
            </h1>
          </div>
          <div className="h-[85%] w-full ">
            <nav className="h-full  w-full">
              <ul className="w-full h-[90%] p-2 relative">
                <li className="text-gray-500">General:</li>
                <Link
                  to={`/`}
                  onClick={() => dispatch(getStoreSubPage("homepage"))}
                  className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group"
                >
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <Home />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">Home </h1>
                  </div>
                </Link>
                <Link
                  to={`/search`}
                  onClick={() => dispatch(getStoreSubPage("search"))}
                  className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group mt-1"
                >
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <Search />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">Search </h1>
                  </div>
                </Link>
                <Link
                  to={`/inbox/${user._id}`}
                  onClick={() => dispatch(getStoreSubPage("inbox"))}
                  className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group mt-1"
                >
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <Inbox />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">Inbox </h1>
                  </div>
                </Link>
                <h1 className="text-gray-500 mt-2">User settings:</h1>
                <li className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group mt-1">
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <ProfileSettings />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">Profile settings </h1>
                  </div>
                </li>
                <li className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group mt-1">
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <ShippingDetails />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">Shipping details </h1>
                  </div>
                </li>
                <li className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group mt-1">
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <MyOrders />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">My orders </h1>
                  </div>
                </li>
                <h1 className="text-gray-500 mt-2">Store settings:</h1>
                <Link
                  to={`/store/${user.storeName}/${user.store._id}`}
                  onClick={() => dispatch(getStoreSubPage("store"))}
                  className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group mt-1"
                >
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <MyStore />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">My store </h1>
                  </div>
                </Link>
                <Link
                  to={`/dashboard/${user.storeName}`}
                  onClick={() => dispatch(getStoreSubPage("editStore"))}
                  className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group mt-1"
                >
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <Dashboard />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">Dashboard </h1>
                  </div>
                </Link>
              </ul>
              <ul className="h-[10%] w-full p-2 ">
                <li className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-900 flex group mt-1">
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <Logout />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-base">Logout</h1>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </main>
      <Outlet />
    </>
  );
};

export default Navbar;
