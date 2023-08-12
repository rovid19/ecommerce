import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  NavLink,
  useLocation,
  useMatch,
} from "react-router-dom";
import { setEditMode } from "../../../app/features/Store/storeEditMode";
import storeSubPage, {
  getStoreSubPage,
} from "../../../app/features/storeSubPage";

const StoreDashboardNav = () => {
  const user = useSelector((state) => state.userData.value.user);
  const editMode = useSelector((state) => state.editMode.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const storeEdit = useMatch({
    path: `/dashboard/${user.storeName}`,
    exact: true,
  });
  const productEdit = useMatch({
    path: `/dashboard/${user.storeName}/products`,
    exact: true,
  });
  const storeFinance = useMatch({
    path: `/dashboard/${user.storeName}/finance`,
    exact: true,
  });

  const storeOrders = useMatch({
    path: `/dashboard/${user.storeName}/orders`,
    exact: true,
  });

  const storeSubPage = useSelector((state) => state.storeSubPage.value);

  return (
    <div className=" w-full h-full shadow-xl relative bg-neutral-900 text-neutral-300">
      {editMode && (
        <div className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 z-20"></div>
      )}
      <div className="h-[15%]  flex justify-center items-center text-neutral-300">
        <h1
          className="font-bold cursor-pointer lg:text-sm 2xl:text-base"
          onClick={() => {
            dispatch(getStoreSubPage("home"));
            dispatch(setEditMode(false));
            navigate("/");
          }}
        >
          Rock's market
        </h1>
      </div>
      <nav className="text-neutral-300">
        {" "}
        <ul className="p-4 lg:pl-2  lg:pr-2  ">
          <li className=" p-2 ">{user && user.storeName}</li>{" "}
          <Link
            exact
            to={`/dashboard/${user.username}`}
            onClick={() => {
              dispatch(getStoreSubPage("editStore"));
              dispatch(setEditMode(false));
            }}
            className={
              storeSubPage === "editStore"
                ? "Navlink hover:bg-orange-500  hover:text-white active 2xl:p-2 lg:p-0 lg:text-sm xl:text-base lg:pl-2 bg-neutral-800"
                : "Navlink hover:bg-orange-500  hover:text-white  2xl:p-2 lg:p-0 lg:text-sm xl:text-base lg:pl-2 bg-neutral-800"
            }
            use
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
            Edit Store
          </Link>
          <Link
            exact
            to={`/dashboard/${user.username}/products`}
            onClick={() => dispatch(getStoreSubPage("products"))}
            className={
              storeSubPage === "products"
                ? "Navlink hover:bg-orange-500 hover:text-white active p-2 2xl:p-2 lg:p-0 lg:text-sm xl:text-base lg:pl-2 bg-neutral-800"
                : "Navlink hover:bg-orange-500 hover:text-white  p-2 2xl:p-2 lg:p-0 lg:text-sm xl:text-base lg:pl-2 bg-neutral-800"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
            Your products
          </Link>
          <Link
            exact
            to={`/dashboard/${user.username}/finance`}
            onClick={() => {
              dispatch(getStoreSubPage("finance"));
              dispatch(setEditMode(false));
            }}
            className={
              storeSubPage === "finance"
                ? "Navlink hover:bg-orange-500 hover:text-white active p-2 2xl:p-2 lg:p-0 lg:text-sm xl:text-base lg:pl-2 bg-neutral-800"
                : "Navlink hover:bg-orange-500 hover:text-white  p-2 2xl:p-2 lg:p-0 lg:text-sm xl:text-base lg:pl-2 bg-neutral-800"
            }
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.902 7.098a3.75 3.75 0 013.903-.884.75.75 0 10.498-1.415A5.25 5.25 0 008.005 9.75H7.5a.75.75 0 000 1.5h.054a5.281 5.281 0 000 1.5H7.5a.75.75 0 000 1.5h.505a5.25 5.25 0 006.494 2.701.75.75 0 00-.498-1.415 3.75 3.75 0 01-4.252-1.286h3.001a.75.75 0 000-1.5H9.075a3.77 3.77 0 010-1.5h3.675a.75.75 0 000-1.5h-3c.105-.14.221-.274.348-.402z"
                clipRule="evenodd"
              />
            </svg>
            Store Finance
          </Link>
          <Link
            exact
            to={`/dashboard/${user.username}/orders`}
            onClick={() => {
              dispatch(getStoreSubPage("orders"));
              dispatch(setEditMode(false));
            }}
            className={
              storeSubPage === "orders"
                ? "Navlink hover:bg-orange-500 hover:text-white active p-2 2xl:p-2 lg:p-0 lg:text-sm xl:text-base lg:pl-2 bg-neutral-800"
                : "Navlink hover:bg-orange-500 hover:text-white  p-2 2xl:p-2 lg:p-0 lg:text-sm xl:text-base lg:pl-2 bg-neutral-800"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            Orders
          </Link>
        </ul>{" "}
        <button
          className="absolute lg:right-2 2xl:right-4 bottom-4"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-neutral-500 hover:text-white"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default StoreDashboardNav;
