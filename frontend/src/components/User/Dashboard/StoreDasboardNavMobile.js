import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useMatch } from "react-router-dom";
import { setEditMode } from "../../../app/features/Store/storeEditMode";
import storeSubPage, {
  getStoreSubPage,
} from "../../../app/features/storeSubPage";

const StoreDashboardNav = () => {
  const user = useSelector((state) => state.userData.value.user);
  const editMode = useSelector((state) => state.editMode.value);
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
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
  console.log(storeSubPage);
  return (
    <div className="absolute bottom-0 left-0 h-[10%] w-full flex items-center z-40 bg-neutral-900 text-neutral-300">
      {editMode && (
        <div className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 z-20"></div>
      )}
      <div className="h-full w-[15%]  text-[10px]   flex justify-center items-center ">
        <h1
          className="cursor-pointer"
          onClick={() => {
            dispatch(getStoreSubPage("home"));
            dispatch(setEditMode(false));
            navigate("/");
          }}
        >
          Rock's <br /> market
        </h1>
      </div>
      <nav className="h-full w-[85%]  ">
        {" "}
        <ul className=" h-full w-full items-center grid grid-cols-4 ">
          <Link
            exact
            to={`/dashboard/${user.storeName}`}
            onClick={() => {
              dispatch(getStoreSubPage("editStore"));
              dispatch(setEditMode(false));
            }}
            className={
              storeSubPage === "editStore"
                ? "w-full h-full text-white bg-orange-500 flex items-center justify-center text-sm"
                : "w-full h-full text-neutral-500  flex items-center justify-center text-sm"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
            Store
          </Link>
          <Link
            exact
            to={`/dashboard/${user.storeName}/products`}
            onClick={() => dispatch(getStoreSubPage("products"))}
            className={
              storeSubPage === "products"
                ? "w-full h-full text-white bg-orange-500 flex items-center justify-center text-sm"
                : "w-full h-full text-neutral-500  flex items-center justify-center text-sm"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-1 "
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
            Products
          </Link>
          <Link
            exact
            to={`/dashboard/${user.storeName}/finance`}
            onClick={() => {
              dispatch(getStoreSubPage("finance"));
              dispatch(setEditMode(false));
            }}
            className={
              storeSubPage === "finance"
                ? "w-full h-full text-white bg-orange-500 flex items-center justify-center text-sm"
                : "w-full h-full text-neutral-500  flex items-center justify-center text-sm"
            }
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.902 7.098a3.75 3.75 0 013.903-.884.75.75 0 10.498-1.415A5.25 5.25 0 008.005 9.75H7.5a.75.75 0 000 1.5h.054a5.281 5.281 0 000 1.5H7.5a.75.75 0 000 1.5h.505a5.25 5.25 0 006.494 2.701.75.75 0 00-.498-1.415 3.75 3.75 0 01-4.252-1.286h3.001a.75.75 0 000-1.5H9.075a3.77 3.77 0 010-1.5h3.675a.75.75 0 000-1.5h-3c.105-.14.221-.274.348-.402z"
                clipRule="evenodd"
              />
            </svg>
            Finance
          </Link>
          <Link
            exact
            to={`/dashboard/${user.storeName}/orders`}
            onClick={() => {
              dispatch(getStoreSubPage("orders"));
              dispatch(setEditMode(false));
            }}
            className={
              storeSubPage === "orders"
                ? "w-full h-full text-white bg-orange-500 flex items-center justify-center text-sm"
                : "w-full h-full text-neutral-500  flex items-center justify-center text-sm"
            }
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
              <path
                fill-rule="evenodd"
                d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                clip-rule="evenodd"
              />
            </svg>
            Orders
          </Link>
        </ul>{" "}
      </nav>
    </div>
  );
};

export default StoreDashboardNav;
