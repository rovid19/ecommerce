import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoreSubPage } from "../../../../app/features/storeSubPage";
import OrderHistory from "./ProfileSubpages/OrderHistory";
import ShippingDetails from "./ProfileSubpages/ShippingDetails";
import Profile from "./ProfileSubpages/Profile";
import { useNavigate } from "react-router-dom";
const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const user = useSelector((state) => state.user.value);
  return (
    <div className="skrin  w-full bg-gray-50 flex items-center justify-center  ">
      <div className="w-[85%] h-full bg-gray-50 flex overflow-hidden">
        <div className="h-[100%] w-[15%]  grid grid-cols-3 fl2  rounded-md gap-2 ">
          <div></div>
          <div
            onClick={() => {
              dispatch(getStoreSubPage("profile"));
              navigate(`/${user._id}/profile`);
            }}
            className={
              storeSubPage === "profile"
                ? "flex items-center justify-center bg-orange-500 text-white cursor-pointer hover:bg-orange-500 hover:text-white w-full text-7xl p-2 rounded-md "
                : "flex items-center justify-center  border-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white w-full text-3xl text-gray-300 rounded-md "
            }
          >
            {storeSubPage === "profile" ? (
              ""
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            Profile
          </div>
          <div
            onClick={() => {
              dispatch(getStoreSubPage("order history"));
              navigate(`/${user._id}/orderhistory`);
            }}
            className={
              storeSubPage === "order history"
                ? "flex items-center justify-center bg-orange-500 text-white cursor-pointer hover:bg-orange-500 hover:text-white w-full text-7xl text-center p-2 rounded-md "
                : "flex items-center justify-center  cursor-pointer hover:bg-orange-500 hover:text-white w-full text-3xl text-gray-300 rounded-md "
            }
          >
            {storeSubPage === "order history" ? (
              ""
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            )}
            Order History
          </div>
          <div
            onClick={() => {
              dispatch(getStoreSubPage("shipping details"));
              navigate(`/${user._id}/shippingdetails`);
            }}
            className={
              storeSubPage === "shipping details"
                ? "flex items-center justify-center bg-orange-500 text-white cursor-pointer hover:bg-orange-500 hover:text-white w-full text-7xl text-center p-2 rounded-md"
                : "flex items-center justify-center  cursor-pointer hover:bg-orange-500 hover:text-white w-full text-3xl text-gray-300  rounded-md"
            }
          >
            {" "}
            {storeSubPage === "shipping details" ? (
              ""
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            Shipping Details
          </div>
        </div>
        <div className="h-[100%] w-[85%] ">
          {storeSubPage === "profile" ? (
            <Profile />
          ) : storeSubPage === "shipping details" ? (
            <ShippingDetails />
          ) : (
            <OrderHistory />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
