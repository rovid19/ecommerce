import React from "react";
import Img from "../../assets/user.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <header className="flex h-[70px] ">
        <div className="w-[100%] lg:w-[75%] flex  items-center md:mr-6 lg:mr-0 ">
          <div className="w-[20%] flex">
            <h1 className="hidden lg:block ml-[60px] ">Rock's Market</h1>
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
          <div className="h-[60%] w-[90%]  lg:w-[70%] flex items-center rounded-3xl border-2 border-gray-300 border-opacity-25  ">
            <div className="w-full h-full flex justify-between items-center">
              <label className="w-[30%] lg:w-[15%] xl:w-[10%] h-[70%] flex justify-center border-r-2 border-gray-300 border-opacity-30 ">
                <select className="bg-transparent text-gray-400 ">
                  <option>Mirok</option>
                  <option>Mirok2</option>
                  <option>Mirok4</option>
                </select>
              </label>
              <input className="w-[80%] h-full" />

              <button className="w-[20%] 2xl:w-[10%] flex items-center gap-2 ml-4  rounded-2xl h-[90%] mr-1 justify-center text-white bg-orange">
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
        <div className="hidden w-[25%] lg:flex items-center">
          <div className=" w-full justify-end flex ">
            {Object.keys(user).length > 0 ? (
              <>
                <div className="flex items-center text-gray-500 gap-2  w-[70px] border-r-2 border-gray-300 border-opacity-30  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <img
                    src={Img}
                    className="h-6 w-6 ml-4 cursor-pointer mr-[60px]"
                  ></img>
                </div>
              </>
            ) : (
              <div className=" h-[33px] flex items-center">
                {" "}
                <Link to="/login" className="h-full">
                  <button className="hidden lg:block h-full mr-[60px] text-gray-400 border-2 border-orange rounded-md w-[80px] hover:bg-orange hover:text-white">
                    Login
                  </button>{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
