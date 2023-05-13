import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Img from "../../../assets/testslika.png";
import { setStoreDeleteVisible } from "../../../app/features/Store/deleteProductModal";
import { addSelectedProduct } from "../../../app/features/Store/selectedProduct";
import { setEditProductModal } from "../../../app/features/Store/Dashboard/editProductModal";
import { setViewProductModal } from "../../../app/features/Store/viewProductModal";
import { useNavigate } from "react-router-dom";
import { setStoreId } from "../../../app/features/Store/storeId";
import { setCartItems } from "../../../app/features/User/cartItems";
import { setProductIndex } from "../../../app/features/User/productIndex";

const StoreProductCard = ({ storeProducts, index, storeData }) => {
  const navigate = useNavigate();
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const deleteProductModal = useSelector(
    (state) => state.deleteProductModal.value
  );
  const editMode = useSelector((state) => state.editMode.value);

  const productIndex = useSelector((state) => state.productIndex.value);
  const user = useSelector((state) => state.user.value);
  const selectedProduct = useSelector((state) => state.selectedProduct.value);
  const dispatch = useDispatch();
  const styles = {
    backgroundImage: `url(${Img})`,
  };

  console.log(storeProducts);

  return (
    <div
      className={
        editMode
          ? "h-[95%] lg:h-[280px] mt-1 ml-2 mr-2 mb-1 bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all relative  "
          : "h-[95%] lg:h-[280px] mt-1 ml-2 mr-2 mb-1 bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all relative "
      }
      onClick={() => {
        dispatch(addSelectedProduct(storeProducts._id));
        if (storeSubPage === "products") {
          console.log("yes");
          dispatch(setEditProductModal(true));
        } else if (storeSubPage === "store") {
          navigate(
            `/store/${storeData.storeName}/product/${storeProducts._id}`
          );
          dispatch(setProductIndex(index));
        }
      }}
    >
      <div className="h-[60%] rounded-t-xl w-full  overflow-hidden ">
        {editMode && storeSubPage === "products" ? (
          <div
            className="absolute top-0 left-0 bg-orange-500 p-2 group rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addSelectedProduct(storeProducts._id));
              dispatch(setStoreDeleteVisible(!deleteProductModal));
            }}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 text-white group-hover:scale-90 "
            >
              <path
                fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        ) : (
          ""
        )}
        <img
          src={storeProducts && storeProducts.productPicture[0]}
          className="h-[100%] w-[100%] object-cover"
        ></img>
      </div>
      <div className="h-[40%] w-full pl-2 pt-1 lg:pt-2 ">
        <h1 className="font-bold text-base lg:text-xl">
          {storeProducts && storeProducts.productNewPrice}€
        </h1>
        <h1 className="font-bold lg:text-base text-sm">
          {storeProducts && storeProducts.productName}
        </h1>
        <p className="text-sm">
          {storeProducts && storeProducts.productDescription}
        </p>
        <div
          className={
            storeSubPage === "editStore" || storeSubPage === "products"
              ? "hidden"
              : " w-full h-[45px] absolute bottom-0 left-0 rounded-b-xl flex items-center pt-2 lg:pt-0 md:bottom-1 lg:bottom-0 "
          }
        >
          <div className="h-[60%] w-[40%] md:w-[30%] lg:w-[25%] bg-yellow-300 rounded-2xl ml-2 flex items-center p-2 md:p-4  lg:p-2 text-sm text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 "
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
            4.8
          </div>
          <div className=" h-[60%] w-[10px] border-r-2 border-gray-300"></div>
          <h2 className="ml-2 text-[12px] md:text-sm"> 120 sold</h2>
          <div className="hidden lg:block h-[60%] w-[10px] border-r-2 border-gray-300"></div>
          <button className="hidden ml-2 bg-orange-500 p-2 h-[60%] lg:flex items-center text-white rounded-xl text-sm  hover:border-2 hover:border-orange-500 hover:text-black">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreProductCard;
