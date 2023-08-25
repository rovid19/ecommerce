import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoreSubPage } from "../../app/features/storeSubPage";
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
  Login,
} from "./Icons/IconsExport";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../../app/features/User/userSlice";
import {
  setActive,
  setCloseNavbar,
  setShowNavbar,
} from "../../app/features/triggeri";

const NavbarMobile = () => {
  // STATES
  const [navbarClassname, setNavbarClassname] = useState(
    "h-full w-[100%] bg-neutral-900 rounded-r-md origin-top self-start navbar"
  );
  const [navbarItems, setNavbarItems] = useState("h-full  w-full pr-2 items");
  const [closeNavbarButton, setCloseNavbarButton] = useState(
    "w-8 h-8 bg-orange-500"
  );
  const [hamburgerMenu, setHamburgerMenu] = useState(
    "w-full h-full  flex items-center justify-center bg-neutral-900 rounded-r-md"
  );
  const [hamMenuBtn, setHamMenuBtn] = useState("w-6 h-6 text-white");

  // REDUX
  const user = useSelector((state) => state.userData.value.user);
  const showNavbar = useSelector((state) => state.triggeri.value.showNavbar);
  const inboxMessages = useSelector(
    (state) => state.inboxMessages.value.allChat
  );
  const closeNavbar = useSelector((state) => state.triggeri.value.closeNavbar);
  const storeSubPage = useSelector((state) => state.storeSubPage.value);

  // OTHER
  const dispatch = useDispatch();

  // USEEFFECTS
  useEffect(() => {
    if (closeNavbar) {
      setTimeout(() => {
        dispatch(setShowNavbar(false));
      }, [600]);

      dispatch(setCloseNavbar(false));
    }
  }, [closeNavbar]);

  // FUNCTIONS
  async function handleLogout() {
    await axios.post("/api/auth/logout-user");
    dispatch(addUser(null));
  }

  const closeNavbarMenu = () => {
    dispatch(setCloseNavbar(true));
    setNavbarClassname((prev) => {
      let newPrev = prev.replace("openNavbar", "closeNavbar");
      return newPrev;
    });
    setNavbarItems((prev) => {
      let newPrev = prev.replace("navbarItems", "closeNavbarItems");
      return newPrev;
    });
    setCloseNavbarButton((prev) => {
      let newPrev = prev.replace("closeButtonOpen", "closeButtonClose");
      return newPrev;
    });
    setTimeout(() => {
      setHamburgerMenu((prev) => prev + " openHamburgerMenu");
    }, [400]);
  };

  return (
    <>
      <main
        className={
          showNavbar
            ? "flex h-full w-full justify-center z-50  items-center shadow-md  transition-all overflow-hidden"
            : "hidden"
        }
      >
        {/* FIRST PART OF HEADER */}
        <header className={navbarClassname}>
          <div className="h-[5%] w-full grid place-items-center relative">
            <button
              className="absolute top-0 left-0"
              onClick={() => {
                setNavbarClassname((prev) => {
                  let newPrev = prev.replace("openNavbar", "closeNavbar");
                  return newPrev;
                });
                setNavbarItems((prev) => {
                  let newPrev = prev.replace("navbarItems", "closeNavbarItems");
                  return newPrev;
                });
                setCloseNavbarButton((prev) => {
                  let newPrev = prev.replace(
                    "closeButtonOpen",
                    "closeButtonClose"
                  );
                  return newPrev;
                });
                setTimeout(() => {
                  dispatch(setShowNavbar(false));
                  setHamburgerMenu((prev) => prev + " openHamburgerMenu");
                  /*setHamMenuBtn((prev) => prev + " openHamMenuBtn");*/
                }, [400]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class={closeNavbarButton}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="h-[95%] w-full ">
            <nav className={navbarItems}>
              <ul className="w-full h-[90%] relative">
                <li className="text-gray-500">General:</li>
                <Link
                  to={`/`}
                  onClick={() => {
                    closeNavbarMenu();
                    dispatch(getStoreSubPage("homepage"));
                  }}
                  className={
                    storeSubPage === "homepage"
                      ? "text-center h-[45px] text-xl rounded-r-md p-1 gap-2  text-white hover:text-white transition-all cursor-pointer bg-neutral-800 flex group"
                      : "text-center h-[45px] text-xl rounded-r-md p-1 gap-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group"
                  }
                >
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <Home />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-sm md:text-base">Home </h1>
                  </div>
                </Link>
                <Link
                  to={`/search`}
                  onClick={() => {
                    closeNavbarMenu();
                    dispatch(getStoreSubPage("search"));
                  }}
                  className={
                    storeSubPage === "search"
                      ? "text-center h-[45px] text-xl rounded-r-md p-1 gap-2 mt-1  text-white hover:text-white transition-all cursor-pointer bg-neutral-800 flex group"
                      : "text-center h-[45px] text-xl rounded-r-md p-1 gap-2 mt-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group"
                  }
                >
                  <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                    <Search />
                  </div>
                  <div className="w-[80%] h-full flex  items-center">
                    <h1 className="text-sm md:text-base">Search </h1>
                  </div>
                </Link>
                {user && (
                  <>
                    {" "}
                    <Link
                      to={user && `/inbox`}
                      onClick={() => {
                        closeNavbarMenu();
                        dispatch(getStoreSubPage("inbox"));
                      }}
                      className={
                        storeSubPage === "inbox"
                          ? "text-center h-[45px] text-xl  p-1 gap-2  text-white hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                          : "text-center h-[45px] text-xl  p-1 gap-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                      }
                    >
                      <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                        {inboxMessages > 0 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-5 h-5 text-orange-500"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 00-.266.112L8.78 21.53A.75.75 0 017.5 21v-3.955a48.842 48.842 0 01-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        ) : (
                          <Inbox />
                        )}
                      </div>
                      <div className="w-[80%] h-full flex  items-center">
                        <div className="w-[70%] h-full flex items-center">
                          <h1 className="text-sm md:text-base">Inbox </h1>
                        </div>
                        <div className="w-[30%] h-full flex items-center justify-end">
                          {" "}
                          {inboxMessages > 0 ? (
                            <h1 className="text-sm mr-2 text-orange-500">
                              + {inboxMessages}{" "}
                            </h1>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </Link>
                    <h1 className="text-gray-500 mt-2">User settings:</h1>
                    <Link
                      to="/profile"
                      onClick={() => {
                        closeNavbarMenu();
                        dispatch(getStoreSubPage("profile"));
                      }}
                      className={
                        storeSubPage === "profile"
                          ? "text-center h-[45px] text-xl  p-1 gap-2  text-white hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                          : "text-center h-[45px] text-xl  p-1 gap-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                      }
                    >
                      <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                        <ProfileSettings />
                      </div>
                      <div className="w-[80%] h-full flex  items-center">
                        <h1 className="text-sm md:text-base">
                          Profile settings{" "}
                        </h1>
                      </div>
                    </Link>
                    <Link
                      to="/shippingdetails"
                      onClick={() => {
                        closeNavbarMenu();
                        dispatch(getStoreSubPage("shippingdetails"));
                      }}
                      className={
                        storeSubPage === "shippingdetails"
                          ? "text-center h-[45px] text-xl  p-1 gap-2  text-white hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                          : "text-center h-[45px] text-xl  p-1 gap-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                      }
                    >
                      <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                        <ShippingDetails />
                      </div>
                      <div className="w-[80%] h-full flex  items-center">
                        <h1 className="text-sm md:text-base">
                          Shipping details{" "}
                        </h1>
                      </div>
                    </Link>
                    <Link
                      to="/myorders"
                      onClick={() => {
                        closeNavbarMenu();
                        dispatch(getStoreSubPage("myorders"));
                      }}
                      className={
                        storeSubPage === "myorders"
                          ? "text-center h-[45px] text-xl  p-1 gap-2  text-white hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                          : "text-center h-[45px] text-xl  p-1 gap-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                      }
                    >
                      <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                        <MyOrders />
                      </div>
                      <div className="w-[80%] h-full flex  items-center">
                        <h1 className="text-sm md:text-base">My orders </h1>
                      </div>
                    </Link>{" "}
                    <h1 className="text-gray-500 mt-2">Store settings:</h1>
                    <Link
                      to={
                        Object.keys(user).length > 0 &&
                        `/store/${user.username}/${user.store._id}`
                      }
                      onClick={() => {
                        closeNavbarMenu();
                        dispatch(getStoreSubPage("store"));
                      }}
                      className={
                        storeSubPage === "store"
                          ? "text-center h-[45px] text-xl  p-1 gap-2  text-white hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                          : "text-center h-[45px] text-xl  p-1 gap-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                      }
                    >
                      <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                        <MyStore />
                      </div>
                      <div className="w-[80%] h-full flex  items-center">
                        <h1 className="text-sm md:text-base">My store </h1>
                      </div>
                    </Link>
                    <Link
                      to={user && `/dashboard/${user.storeName}`}
                      onClick={() => {
                        closeNavbarMenu();
                        dispatch(getStoreSubPage("editStore"));
                      }}
                      className="text-center h-[45px] text-xl  p-1 gap-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                    >
                      <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                        <Dashboard />
                      </div>
                      <div className="w-[80%] h-full flex  items-center">
                        <h1 className="text-sm md:text-base">Dashboard </h1>
                      </div>
                    </Link>
                  </>
                )}
              </ul>

              <ul className="h-[10%] w-full pr-1 flex flex-row">
                {user ? (
                  <li
                    onClick={() => {
                      dispatch(setActive("homepage"));
                      handleLogout();
                    }}
                    className="self-end text-center h-[45px] text-xl w-full p-1 gap-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                  >
                    <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                      <Logout />
                    </div>
                    <div className="w-[80%] h-full flex  items-center">
                      <h1 className="text-sm md:text-base">Logout</h1>
                    </div>
                  </li>
                ) : (
                  <Link
                    to="/login"
                    className="text-center self-end w-full h-[45px] text-xl  p-1 gap-2 mb-2  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1 rounded-r-md"
                  >
                    <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                      <Login />
                    </div>
                    <div className="w-[80%] h-full flex  items-center">
                      <h1 className="text-sm md:text-base">Log in</h1>
                    </div>
                  </Link>
                )}
              </ul>
            </nav>
          </div>
        </header>
      </main>

      {showNavbar ? (
        ""
      ) : (
        <article className={hamburgerMenu}>
          <button
            onClick={() => {
              if (navbarClassname.includes("closeNavbar")) {
                setNavbarClassname((prev) => {
                  let newPrev = prev.replace("closeNavbar", "openNavbar");
                  return newPrev;
                });
                setNavbarItems((prev) => {
                  let newPrev = prev.replace("closeNavbarItems", "navbarItems");
                  return newPrev;
                });
                setCloseNavbarButton((prev) => {
                  let newPrev = prev.replace(
                    "closeButtonClose",
                    "closeButtonOpen"
                  );
                  return newPrev;
                });
                setHamburgerMenu((prev) => {
                  let newPrev = prev.replace("openHamburgerMenu", "");
                  return newPrev;
                });
                /*setHamMenuBtn((prev) => {
                let newPrev = prev.replace("openHamMenuBtn", "");
                return newPrev;
              });*/
              } else {
                setNavbarClassname((prev) => prev + " openNavbar");
                setNavbarItems((prev) => prev + " navbarItems");
                setCloseNavbarButton((prev) => prev + " closeButtonOpen");
              }

              dispatch(setShowNavbar(true));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class={hamMenuBtn}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>
        </article>
      )}
    </>
  );
};

export default NavbarMobile;
