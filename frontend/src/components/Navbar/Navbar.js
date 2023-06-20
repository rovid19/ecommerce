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
      <header className="flex h-full justify-center z-50 ">
        {/* FIRST PART OF HEADER */}
        <div className="w-[100%] h-full flex lg:w-[85%]">
          <div className="w-[100%] lg:w-[75%] flex  items-center md:mr-6 lg:mr-0 ">
            <div className="w-[20%] flex">
              <h1
                className="hidden lg:block cursor-pointer "
                onClick={() => {
                  navigate("/");
                  dispatch(getStoreSubPage("homepage"));
                }}
              >
                Rock's Market
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7 lg:hidden ml-2 md:ml-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {/* SEARCH BAR */}
            <div className="h-[60%] w-[90%]  lg:w-[70%] flex items-center rounded-3xl border-2 border-gray-300 border-opacity-25  ">
              <div className="w-full h-full flex justify-between items-center">
                <label className="w-[30%] lg:w-[15%] xl:w-[10%] h-[70%] flex justify-center border-r-2 border-gray-300 border-opacity-30 ">
                  <select
                    className="bg-transparent text-gray-400 "
                    onChange={(e) => setOption(e.target.value)}
                  >
                    <option>Stores</option>
                    <option>Products</option>
                  </select>
                </label>
                <input
                  className="w-[80%] h-full"
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                <button
                  className="w-[20%] 2xl:w-[10%] flex items-center gap-2 ml-4  rounded-2xl h-[90%] mr-1 justify-center text-white bg-orange-500"
                  onClick={() => {
                    dispatch(getStoreSubPage("Search"));
                    handleSearch();
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <h1 className="hidden lg:block">Search</h1>
                </button>
              </div>
            </div>
          </div>
          {/* SECOND PART OF HEADER */}
          <div className="hidden w-[25%] lg:flex items-center">
            <div className=" w-full justify-end flex ">
              {user && Object.keys(user).length > 0 ? (
                <>
                  <div
                    className={
                      user.role === "Customer"
                        ? "flex items-center text-gray-500 gap-2 w-[70px]  border-r-2 border-gray-300 border-opacity-30"
                        : "flex items-center text-gray-500 gap-2 w-[100px] border-r-2 border-gray-300 border-opacity-30"
                    }
                  >
                    <NavbarUserMenu />
                  </div>
                  <div>
                    <img
                      src={Img}
                      className="h-6 w-6 ml-4 cursor-pointer "
                      onClick={() => {
                        navigate(`/${user._id}/profile`);
                        dispatch(getStoreSubPage("profile"));
                      }}
                    ></img>
                  </div>
                </>
              ) : (
                <div className=" h-[33px] flex items-center">
                  {" "}
                  <Link to="/login" className="h-full">
                    <button className="hidden lg:block h-full ] text-gray-400 border-2 border-orange-500 rounded-md w-[80px] hover:bg-orange-500 hover:text-white">
                      Login
                    </button>{" "}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
