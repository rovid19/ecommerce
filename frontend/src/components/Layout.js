import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartVisible } from "../app/features/User/cartVisible";
import { setMobileActive, setShowNavbar } from "../app/features/triggeri";
import NavbarMobile from "./Navbar/NavbarMobile";
import AddToCart from "./User/Customer/AddToCart";

const Layout = () => {
  const dispatch = useDispatch();
  const showNavbar = useSelector((state) => state.triggeri.value.showNavbar);
  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );
  const cartItems = useSelector((state) => state.cartItems.value);
  const cartVisible = useSelector((state) => state.cartVisible.value);

  useEffect(() => {
    const resizeFunc = () => {
      if (window.innerWidth <= 1024) {
        dispatch(setShowNavbar(false));
        dispatch(setMobileActive(true));
      } else {
        dispatch(setShowNavbar(true));
        dispatch(setMobileActive(false));
      }
    };

    window.addEventListener("resize", resizeFunc);

    return () => {
      window.removeEventListener("resize", resizeFunc);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      dispatch(setShowNavbar(false));
      dispatch(setMobileActive(true));
    } else {
      dispatch(setShowNavbar(true));
      dispatch(setMobileActive(false));
    }
  }, []);

  return (
    <main className="h-screen w-screen flex relative">
      {cartItems.length > 0 && cartVisible === false ? (
        <article className="h-[50px] lg:h-[50px] w-[40px] lg:w-[40px]  flex items-center absolute z-40 right-0 bottom-0 lg:right-1   ">
          <button
            className="rounded-full bg-neutral-600 p-2 opacity-50 hover:opacity-100  transition-all"
            onClick={() => dispatch(setCartVisible(true))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-neutral-900"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </article>
      ) : (
        ""
      )}

      <div
        className={
          mobileActive && showNavbar
            ? "w-[150px] h-full absolute top-0 left-0 zeze"
            : mobileActive
            ? "w-[45px] h-[50px] absolute top-0 left-0 zeze "
            : "md:w-[12%] xl:w-[12%] lg:w-[16%] h-full overflow-hidden "
        }
      >
        {" "}
        {mobileActive ? <NavbarMobile /> : <Navbar />}
      </div>

      <div className={mobileActive ? "w-full h-full   " : "w-[88%] h-full   "}>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
