import React from "react";
import { Link, Outlet } from "react-router-dom";
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
} from "./Icons/IconsExport";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../../app/features/User/userSlice";
import NavbarMobile from "./NavbarMobile.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.value.user);
  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );
  const inboxMessages = useSelector(
    (state) => state.inboxMessages.value.allChat
  );

  async function handleLogout() {
    await axios.post("/api/auth/logout-user");
    dispatch(addUser(null));
  }

  return (
    <>
      {!mobileActive && (
        <main className=" h-full w-full justify-center z-50  items-center shadow-md md:hidden lg:flex ">
          {/* FIRST PART OF HEADER */}
          <header className="h-full w-[100%] bg-neutral-900">
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
                    className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group"
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
                    className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
                  >
                    <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                      <Search />
                    </div>
                    <div className="w-[80%] h-full flex  items-center">
                      <h1 className="text-base">Search </h1>
                    </div>
                  </Link>
                  {user && (
                    <>
                      {" "}
                      <Link
                        to={user && `/inbox`}
                        onClick={() => dispatch(getStoreSubPage("inbox"))}
                        className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
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
                            <h1 className="text-base">Inbox </h1>
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
                        onClick={() => dispatch(getStoreSubPage("profile"))}
                        className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
                      >
                        <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                          <ProfileSettings />
                        </div>
                        <div className="w-[80%] h-full flex  items-center">
                          <h1 className="text-base">Profile settings </h1>
                        </div>
                      </Link>
                      <Link
                        to="/shippingdetails"
                        onClick={() =>
                          dispatch(getStoreSubPage("shippingdetails"))
                        }
                        className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
                      >
                        <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                          <ShippingDetails />
                        </div>
                        <div className="w-[80%] h-full flex  items-center">
                          <h1 className="text-base">Shipping details </h1>
                        </div>
                      </Link>
                      <Link
                        to="/myorders"
                        onClick={() => dispatch(getStoreSubPage("myorders"))}
                        className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
                      >
                        <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                          <MyOrders />
                        </div>
                        <div className="w-[80%] h-full flex  items-center">
                          <h1 className="text-base">My orders </h1>
                        </div>
                      </Link>{" "}
                      <h1 className="text-gray-500 mt-2">Store settings:</h1>
                      <Link
                        /*to={user && `/store/${user.username}/${user.store._id}`}*/
                        className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
                      >
                        <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                          <MyStore />
                        </div>
                        <div className="w-[80%] h-full flex  items-center">
                          <h1 className="text-base">My store </h1>
                        </div>
                      </Link>
                      <Link
                        to={user && `/dashboard/${user.storeName}`}
                        onClick={() => dispatch(getStoreSubPage("editStore"))}
                        className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
                      >
                        <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                          <Dashboard />
                        </div>
                        <div className="w-[80%] h-full flex  items-center">
                          <h1 className="text-base">Dashboard </h1>
                        </div>
                      </Link>
                    </>
                  )}
                </ul>

                <ul className="h-[10%] w-full p-2 ">
                  {user ? (
                    <li
                      onClick={handleLogout}
                      className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
                    >
                      <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                        <Logout />
                      </div>
                      <div className="w-[80%] h-full flex  items-center">
                        <h1 className="text-base">Logout</h1>
                      </div>
                    </li>
                  ) : (
                    <Link
                      to="/login"
                      className="text-center h-[45px] text-xl rounded-md p-1  text-gray-400 hover:text-white transition-all cursor-pointer bg-neutral-800 flex group mt-1"
                    >
                      <div className="w-[20%] h-full flex justify-center items-center group-hover:text-gray-400 transition-all ">
                        <Logout />
                      </div>
                      <div className="w-[80%] h-full flex  items-center">
                        <h1 className="text-base">Log in</h1>
                      </div>
                    </Link>
                  )}
                </ul>
              </nav>
            </div>
          </header>
        </main>
      )}
      <div className="md:visible lg:hidden h-full w-full">
        {" "}
        <NavbarMobile />
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
