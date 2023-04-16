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
    <div className="h-full  w-full bg-gray-50 flex items-center justify-center  ">
      <div className="w-[85%] h-full bg-white relative">
        <div className="h-[5%] w-full absolute top-0 grid grid-cols-3">
          <div
            onClick={() => {
              dispatch(getStoreSubPage("profile"));
              navigate(`/${user._id}/profile`);
            }}
            className={
              storeSubPage === "profile"
                ? "flex items-center justify-center bg-orange-500 text-white cursor-pointer hover:bg-orange-500 hover:text-white"
                : "flex items-center justify-center border-t-2 border-l-2 border-b-2  border-opacity-10 border-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white"
            }
          >
            Profile
          </div>
          <div
            onClick={() => {
              dispatch(getStoreSubPage("order history"));
              navigate(`/${user._id}/orderhistory`);
            }}
            className={
              storeSubPage === "order history"
                ? "flex items-center justify-center bg-orange-500 text-white cursor-pointer hover:bg-orange-500 hover:text-white"
                : "flex items-center justify-center border-2 border-opacity-10 border-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white"
            }
          >
            Order History
          </div>
          <div
            onClick={() => {
              dispatch(getStoreSubPage("shipping details"));
              navigate(`/${user._id}/shippingdetails`);
            }}
            className={
              storeSubPage === "shipping details"
                ? "flex items-center justify-center bg-orange-500 text-white cursor-pointer hover:bg-orange-500 hover:text-white"
                : "flex items-center justify-center border-t-2 border-r-2 border-b-2 border-opacity-10 border-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white"
            }
          >
            Shipping Details
          </div>
        </div>
        <div className="h-[95%] absolute top-[5%] w-full">
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
