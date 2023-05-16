import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";
import { useNavigate, useParams } from "react-router-dom";
import { setCartVisible } from "../../../../app/features/User/cartVisible";
import { setCartItems } from "../../../../app/features/User/cartItems";
import Reviews from "../Reviews/Reviews";
import { addSelectedProduct } from "../../../../app/features/Store/selectedProduct";
import StoreProductPictures from "./StoreProductPictures";
import { setOpenReviewPic } from "../../../../app/features/User/openReviewPic";
import {
  removePic,
  removeSecificPic,
} from "../../../../app/features/User/reviewPic";
import { setviewImage } from "../../../../app/features/User/viewImage";
import { setViewReviewPic } from "../../../../app/features/User/viewReviewPic";

const StoreProductModal = () => {
  // STATES
  const [productTitle, setProductTitle] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [productPicture, setProductPicture] = useState([]);

  // REDUX
  const openReviewPic = useSelector((state) => state.openReviewPic.value);
  const search = useSelector((state) => state.search.value);
  const reviewPic = useSelector((state) => state.reviewPic.value);
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const storeId = useSelector((state) => state.storeId.value);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const productIndex = useSelector((state) => state.productIndex.value);
  const cartItems = useSelector((state) => state.cartItems.value);
  const savedStore = useSelector((state) => state.savedStore.value);
  const viewReviewPic = useSelector((state) => state.viewReviewPic.value);
  const viewImage = useSelector((state) => state.viewImage.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(addSelectedProduct(productId));
    setIsFetching(true);
    axios
      .post("/api/store/get-current-product", { productId })
      .then(({ data }) => {
        setProductPicture(data.productPicture);
        setProductTitle(data.productName);
        setProductDescription(data.productDescription);
        setProductPrice(data.productNewPrice);
      })
      .then(() => {
        setIsFetching(false);
      });
  }, []);

  // FUNCTIONS
  function addProductToCart() {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem._id === storeProducts[productIndex]._id
    );

    if (isItemInCart) {
      alert("item already in cart");
    } else {
      dispatch(setCartItems(storeProducts[productIndex]));
      dispatch(setCartVisible(true));
    }
  }
  useEffect(() => {
    if (deleteProduct !== null) {
      dispatch(removeSecificPic(deleteProduct));
      setDeleteProduct(null);
    }
  }, [deleteProduct]);

  return (
    <div className="absolute top-0 z-20 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center ">
      {openReviewPic && (
        <section className="absolute top-0 zz left-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center">
          <article className="h-[30%] w-[70%] bg-white relative grid grid-cols-5 overflow-hidden rounded-md shadow-2xl">
            {reviewPic.map((pic, i) => {
              return (
                <div className="h-full w-full relative">
                  <img
                    src={pic}
                    className="h-full w-full object-cover overflow-hidden"
                  ></img>
                  <button
                    className="absolute top-2 left-2"
                    onClick={() => setDeleteProduct(i)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-8 h-8 text-white bg-orange-500 p-1 rounded-md hover:bg-black transition-all"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
            <button
              className="absolute right-0 top-0"
              onClick={() => dispatch(setOpenReviewPic(false))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6  hover:scale-110"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </article>
        </section>
      )}
      {/* CLOSE PRODUCT MODAL BUTTON*/}
      <button
        onClick={() => {
          if (storeSubPage === "Search") {
            navigate(`/search/${search.searchOption}/${search.search}`);
          } else {
            navigate(`/store/${savedStore.storeName}/${storeId}`);
          }
          dispatch(removePic([]));
        }}
        className=" text-black absolute top-2 left-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 text-white hover:scale-95 opacity-50 hover:opacity-100"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* MAIN DIV */}
      <div className="w-[85%] h-full bg-white relative">
        {isFetching && (
          <div className="w-full h-full absolute top-0 left-0 z-50 bg-white flex items-center justify-center">
            {" "}
            <img src={Loader}></img>{" "}
          </div>
        )}
        {/* IMAGE ZOOMED IN */}
        {viewImage && (
          <div className="absolute top-0 left-0 h-full w-full z-50">
            <img
              src={
                viewReviewPic
                  ? viewReviewPic
                  : productPicture && productPicture[0]
              }
              className="h-full w-full object-cover "
            ></img>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 absolute right-2 bottom-2 text-white cursor-pointer hover:scale-95"
              onClick={() => {
                dispatch(setviewImage(false));
                dispatch(setViewReviewPic(null));
              }}
            >
              <path
                fillRule="evenodd"
                d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zM12.53 9.22a.75.75 0 10-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L15.31 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <StoreProductPictures
          storeProducts={storeProducts}
          productIndex={productIndex}
          viewImage={viewImage}
          isFetching={isFetching}
          productPicture={productPicture}
          setProductPicture={setProductPicture}
        />
        {/* DETAILS ABOUT PRODUCT */}
        <div className="h-[50%] w-[75%]  p-4 relative">
          {/* PRODUCT TITLE*/}
          <h1 className="text-6xl">{productTitle}</h1>
          {/* PRODUCT DESCRIPTION */}
          <p className="mt-4"> {productDescription}</p>
          {/* ADD TO CART BUTTON*/}
          <button
            onClick={addProductToCart}
            className="bottom-4 border-2 border-orange-500 text-orange-500 p-4 rounded-lg left-[30%] w-[15%] text-xl hover:bg-orange-500 hover:text-white transition-all absolute"
          >
            Add to cart
          </button>
          {/* BUY NOW BUTTON*/}
          <button className="bottom-4 bg-orange-500 p-4 rounded-lg text-white left-4 w-[25%] text-xl hover:w-[28%] transition-all absolute">
            Buy now
          </button>
          {/* PRODUCT RATING*/}
          <div className="bottom-4 right-4 absolute">
            <h2 className="text-xl">4.5</h2>
          </div>
        </div>
        {/* REVIEWS */}

        <Reviews />
      </div>
    </div>
  );
};

export default StoreProductModal;
