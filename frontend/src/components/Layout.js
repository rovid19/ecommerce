import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartVisible } from "../app/features/User/cartVisible";
import { setMobileActive, setShowNavbar } from "../app/features/triggeri";
import NavbarMobile from "./Navbar/NavbarMobile";
import NotificationBar from "./User/NotificationBar";

const Layout = () => {
  // STATES
  const [className, setClassName] = useState(
    "absolute bottom-0 right-0 proporcije bg-orange-500 zeze rounded-l-md cursor-pointer  transition-all "
  );
  const [alertBar, setAlertBar] = useState(false);
  const [chatMessageArray, setChatMessageArray] = useState([]);
  const [allChat, setAllChat] = useState(null);
  const [index, setIndex] = useState(null);

  // REDUX
  const showNavbar = useSelector((state) => state.triggeri.value.showNavbar);
  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );
  const cartItems = useSelector((state) => state.cartItems.value);
  const cartVisible = useSelector((state) => state.cartVisible.value);
  const user = useSelector((state) => state.userData.value.user);

  // OTHER
  const dispatch = useDispatch();

  // USEEFFECTS

  //dodavanje css-a ovisno o tome ako je notification bar otvoren ili zatvoren
  useEffect(() => {
    if (alertBar) {
      // promjena boje notificationbara iz narancaste u crnu prilikom otvaranja notbara
      setClassName((prev) => {
        const newPrev = prev.replace("bg-orange-500", "bg-neutral-700");
        return newPrev;
      });
    } else {
      // promjena boje notificationbara iz crnu u narancastu prilikom zatvaranja notbara
      setClassName((prev) => {
        const newPrev = prev.replace("bg-neutral-700", "bg-orange-500");
        return newPrev;
      });
    }
  }, [alertBar]);

  //
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

  /*useEffect(() => {
    if (window.innerWidth <= 1024) {
      dispatch(setShowNavbar(false));
      dispatch(setMobileActive(true));
    } else {
      dispatch(setShowNavbar(true));
      dispatch(setMobileActive(false));
    }
  }, []);*/
  console.log(chatMessageArray);
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

      <div
        className={
          mobileActive
            ? "w-full h-full relative  "
            : "w-[88%] h-full  relative "
        }
      >
        {user && Object.keys(user).length > 0 && (
          <NotificationBar
            alertBar={alertBar}
            className={className}
            setClassName={setClassName}
            setAlertBar={setAlertBar}
            setChatMessageArray={setChatMessageArray}
            chatMessageArray={chatMessageArray}
            allChat={allChat}
            setAllChat={setAllChat}
            index={index}
            setIndex={setIndex}
          />
        )}
        {chatMessageArray.length > 0 && (
          <div
            className={
              alertBar
                ? "absolute h-[5%] min-w-auto max-w-full gap-2 bottom-0 right-[300px]  z-50 flex transition-all pr-2"
                : "absolute h-[5%] min-w-auto max-w-full gap-2 bottom-0 right-[100px]  z-50 flex transition-all pr-2 "
            }
          >
            {chatMessageArray.map((chat, i) => {
              const participant = chat.participants.filter(
                (participant) => participant._id !== user._id
              );

              return (
                <div className="h-full w-[50px] rounded-full self-end  cursor-pointer relative group">
                  <img
                    src={participant[0].profilePicture}
                    className="h-full w-full object-cover rounded-full"
                  ></img>
                  <button
                    className="absolute top-0 right-0 text-white hidden group-hover:block hover:text-orange-500"
                    onClick={() => {
                      const index = chatMessageArray.findIndex(
                        (chatUser) => chatUser._id === chat._id
                      );

                      let newArray = [...chatMessageArray];

                      const splicedItem = newArray.splice(index, 1);
                      console.log(splicedItem);
                      console.log(newArray);

                      setChatMessageArray(newArray);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 "
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
