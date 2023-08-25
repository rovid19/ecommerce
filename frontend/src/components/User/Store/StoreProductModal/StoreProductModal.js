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
import { setViewProductModal } from "../../../../app/features/Store/viewProductModal";
import {
  setCartClassname,
  setProductPictures,
} from "../../../../app/features/triggeri";

const StoreProductModal = () => {
  // STATES
  const [productTitle, setProductTitle] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [productPicture, setProductPicture] = useState([]);

  // REDUX
  const user = useSelector((state) => state.userData.value.user);
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
  const viewProductModal = useSelector((state) => state.viewProductModal.value);
  const cartClassname = useSelector(
    (state) => state.triggeri.value.cartClassname
  );

  // OTHER
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  // USEEFFECTS
  useEffect(() => {
    dispatch(addSelectedProduct(productId));
    setIsFetching(true);
    axios
      .post("/api/store/get-current-product", { selectedProduct: productId })
      .then(({ data }) => {
        setProductPicture(data.productPicture);
        setProductTitle(data.productName);
        setProductDescription(data.productDescription);
        setProductPrice(data.productNewPrice);
        dispatch(setProductPictures(data.productPicture));
      })
      .then(() => {
        setIsFetching(false);
      });
  }, []);

  // FUNCTIONS
  function addProductToCart() {
    let isItemInCart = false;
    if (cartItems.length > 0) {
      isItemInCart = cartItems.find(
        (cartItem) => cartItem._id === storeProducts._id
      );
    }

    if (isItemInCart) {
      alert("item already in cart");
    } else {
      dispatch(setCartItems(storeProducts));
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
    <div className="w-full h-full bg-neutral-700 text-neutral-300 relative">
      {openReviewPic && (
        <section className="absolute top-[100%] lg:top-0 left-0 w-full h-full bg-black bg-opacity-25 flex items-center justify-center ze  ">
          <article className="h-[30%] w-[70%] bg-neutral-700 relative grid grid-cols-5 overflow-hidden rounded-md shadow-2xl">
            {reviewPic.map((pic, i) => {
              return (
                <div className="h-full w-full relative" key={i}>
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
                      className="w-8 h-8 text-white bg-orange-500 p-1 rounded-md hover:bg-black transition-all"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
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
                className="w-6 h-6  hover:scale-110"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </article>
        </section>
      )}
      {/* CLOSE PRODUCT MODAL BUTTON*/}
      <button
        onClick={() => {
          if (storeSubPage === "search") {
            navigate(`/search/${search.searchOption}/${search.search}`);
          } else if (storeSubPage === "homepage") {
            dispatch(addSelectedProduct(null));
            navigate("/");
          } else {
            dispatch(addSelectedProduct(null));
            navigate(`/store/${savedStore.storeName}/${storeId}`);
            dispatch(setViewProductModal(!viewProductModal));
          }
          dispatch(removePic([]));
        }}
        className=" text-black absolute top-2 right-2 lg:left-2 zIn  w-[10%]  lg:w-[5%] xl:w-[2%]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 text-neutral-300 hover:text-neutral-500 transition-all hover:opacity-100"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* MAIN DIV */}

      {isFetching && (
        <div className="w-full h-full absolute top-0 left-0 z-50 bg- neutral-800 flex items-center justify-center">
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
            className="w-16 h-16 absolute right-2 bottom-2 text-neutral-900 cursor-pointer hover:scale-95"
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
      <div className="h-[50%] w-full lg:w-[75%]  p-4 relative ">
        <div className=" h-[15%] w-[30%] lg:w-[100px]  absolute top-2 right-0 lg:right-4 flex items-center justify-center">
          <h1 className="text-neutral-300 text-4xl lg:text-4xl font-bold">
            {productPrice}€
          </h1>
        </div>
        {/* PRODUCT TITLE*/}
        <div className="w-[70%]">
          <h1 className="text-4xl lg:text-6xl">{productTitle}</h1>
        </div>
        {/* PRODUCT DESCRIPTION */}
        <p className="mt-4 break-words w-full lg:w-[70%]">
          {" "}
          {productDescription}
        </p>

        <div className="w-full  h-[20%] absolute bottom-0 left-0 flex items-center pl-2 ">
          {" "}
          {/* BUY NOW BUTTON*/}
          <button
            className=" bg-orange-500 p-4 rounded-lg text-white  w-[35%]  lg:w-[25%]  h-[80%] text-base lg:text-xl lg:hover:w-[28%] transition-all"
            onClick={() => {
              if (user && Object.keys(user).length > 0) {
              } else {
                alert("You must make an account in order to buy a product");
              }
            }}
          >
            Buy now
          </button>{" "}
          {/* ADD TO CART BUTTON*/}
          <button
            onClick={() => {
              addProductToCart();
              dispatch(setCartClassname(cartClassname + " cartOpen"));
            }}
            className=" absolute left-[40%] lg:left-[29%] border-2 border-orange-500 text-orange-500 p-4 rounded-lg h-[80%] w-[30%] lg:w-[15%] text-base lg:text-xl hover:bg-orange-500 hover:text-white transition-all"
          >
            Add to cart
          </button>
          {/* PRODUCT RATING*/}
          <div className=" absolute h-full  right-0 flex items-center w-[10%] lg:w-[5%] justify-center">
            <h2 className="text-xl">{storeProducts.productScore}</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4 ml-1"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* REVIEWS */}

      <Reviews />
    </div>
  );
};

export default StoreProductModal;
