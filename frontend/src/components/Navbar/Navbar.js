import React, { useState } from "react";
import Img from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NavbarUserMenu from "./NavbarUserMenu";
import { getStoreSubPage } from "../../app/features/storeSubPage";
import axios from "axios";
import { setSearchResults } from "../../app/features/User/searchResults";
import { setSearch, setSearchOption } from "../../app/features/User/search";

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
            <h1 className="font-bold cursor-pointer">Rock's market</h1>
          </div>
          <div className="h-[80%] w-full">
            <nav className="w-full h-full">
              <ul className="w-full h-full p-1">
                <li className="text-gray-500">General:</li>
                <li className="text-center text-xl rounded-md p-2 text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 ">
                  Home
                </li>
                <li className="text-center text-xl rounded-md p-2 text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 mt-1">
                  Search
                </li>
                <li className="text-center text-xl rounded-md p-2 text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 mt-1">
                  Inbox
                </li>
                <li className="text-center text-xl rounded-md p-2 text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 mt-1">
                  Dashboard
                </li>
                <li className="text-center text-xl rounded-md p-2 text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 mt-1">
                  My Orders
                </li>
                <li className="text-center text-xl rounded-md p-2 text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 mt-1">
                  Shipping details
                </li>
                <li className="text-center text-xl rounded-md p-2 text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 mt-1">
                  Profile Settings
                </li>
                <li className="text-center text-xl rounded-md p-2 text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 mt-1">
                  My Store
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
