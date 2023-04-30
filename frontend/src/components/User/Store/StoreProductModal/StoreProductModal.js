import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewProductModal } from "../../../../app/features/Store/viewProductModal";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";
import { useNavigate, useParams } from "react-router-dom";
import cartVisible, {
  setCartVisible,
} from "../../../../app/features/User/cartVisible";
import { switchValue } from "../../../../app/features/getUserTrigger";
import { setCartItems } from "../../../../app/features/User/cartItems";

const StoreProductModal = () => {
  const [productPicture, setProductPicture] = useState([]);
  const [productTitle, setProductTitle] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const selectedProduct = useSelector((state) => state.selectedProduct.value);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const user = useSelector((state) => state.user.value);
  const storeId = useSelector((state) => state.storeId.value);
  const storeProducts = useSelector((state) => state.storeProducts.value);
  const productIndex = useSelector((state) => state.productIndex.value);
  const cartItems = useSelector((state) => state.cartItems.value);
  const savedStore = useSelector((state) => state.savedStore.value);

  useEffect(() => {
    if (storeProducts.length === 0) {
      console.log("pokrenulo se je");
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
    }
  }, []);

  //functions

  function handleChangePictureNext(index) {
    return function () {
      let newArray = [...productPicture];
      const arrayEnd = newArray.length;
      const splicedItem = newArray.splice(index, 1);
      newArray.splice(arrayEnd, 0, splicedItem);
      setProductPicture(newArray);
    };
  }

  function handleChangePicturePrevious(index) {
    return function () {
      let newArray = [...productPicture];
      const arrayEnd = newArray.length - 1;
      const splicedItem = newArray.splice(arrayEnd, 1);
      newArray.splice(0, 0, splicedItem);
      setProductPicture(newArray);
    };
  }
  /*
  function addProductToCart() {
    if (user.addToCart.includes(selectedProduct)) {
      alert("product already in cart");
    } else {
      dispatch(setCartVisible(true));

      axios
        .post("/api/customer/add-product-to-cart", { selectedProduct })
        .then(() => {
          dispatch(switchValue(!getUserTrigger));
        });
    }
  } */

  // nova shema
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

  return (
    <div className="absolute top-0 z-20 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center ">
      {/* CLOSE PRODUCT MODAL BUTTON*/}
      <button
        onClick={() => navigate(`/store/${savedStore.storeName}/${storeId}`)}
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
                storeProducts
                  ? storeProducts[productIndex].productPicture[0]
                  : productPicture && productPicture[0]
              }
              className="h-full w-full object-cover "
            ></img>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 absolute right-2 bottom-2 text-white cursor-pointer hover:scale-95"
              onClick={() => setViewImage(false)}
            >
              <path
                fillRule="evenodd"
                d="M2.515 10.674a1.875 1.875 0 000 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 003-3V6.75a3 3 0 00-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374zM12.53 9.22a.75.75 0 10-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L15.31 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {/* PRODUCT PICTURES */}
        <div
          className={viewImage ? "hidden " : "h-[50%] w-[75%] flex relative "}
        >
          {storeProducts.length > 0
            ? storeProducts[productIndex].productPicture.map((item, index) => {
                switch (index) {
                  case 0:
                    return (
                      <div className="h-full w-[50%] object-cover z-50 flex items-center relative ">
                        <button className="absolute top-4 left-4 z-30">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-white hover:scale-95 transition-all"
                            onClick={() => setViewImage(true)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                            />
                          </svg>
                        </button>
                        <img
                          src={item}
                          className="h-full w-full object-cover"
                        ></img>
                        <button onClick={handleChangePictureNext(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-14 h-14 absolute right-2 text-white cursor-pointer hover:scale-95"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                        <button onClick={handleChangePicturePrevious(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-14 h-14 absolute left-2 text-white cursor-pointer hover:scale-95"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  case 1:
                    return (
                      <img
                        src={item}
                        className={
                          storeProducts[productIndex].productPicture.length ===
                          2
                            ? "h-full w-[50%] object-cover absolute z-40 left-[50%]"
                            : storeProducts[productIndex].productPicture
                                .length === 3
                            ? "h-full w-[50%] object-cover absolute z-40 left-[25%]"
                            : storeProducts[productIndex].productPicture
                                .length === 4
                            ? "h-full w-[50%] object-cover absolute z-40 left-[16.6%]"
                            : storeProducts[productIndex].productPicture
                                .length === 5
                            ? "h-full w-[50%] object-cover absolute z-40 left-[12.5%]"
                            : storeProducts[productIndex].productPicture
                                .length === 6
                            ? "h-full w-[50%] object-cover absolute z-40 left-[10%]"
                            : ""
                        }
                      ></img>
                    );
                  case 2:
                    return (
                      <img
                        src={item}
                        className={
                          storeProducts[productIndex].productPicture.length ===
                          3
                            ? "h-full w-[50%] object-cover absolute z-30 left-[50%]"
                            : storeProducts[productIndex].productPicture
                                .length === 4
                            ? "h-full w-[50%] object-cover absolute z-30 left-[33.2%]"
                            : storeProducts[productIndex].productPicture
                                .length === 5
                            ? "h-full w-[50%] object-cover absolute z-30 left-[25%]"
                            : storeProducts[productIndex].productPicture
                                .length === 6
                            ? "h-full w-[50%] object-cover absolute z-30 left-[20%]"
                            : ""
                        }
                      ></img>
                    );
                  case 3:
                    return (
                      <img
                        src={item}
                        className={
                          storeProducts[productIndex].productPicture.length ===
                          4
                            ? "h-full w-[50%] object-cover absolute z-20 left-[50%]"
                            : storeProducts[productIndex].productPicture
                                .length === 5
                            ? "h-full w-[50%] object-cover absolute z-20 left-[37.5%]"
                            : storeProducts[productIndex].productPicture
                                .length === 6
                            ? "h-full w-[50%] object-cover absolute z-20 left-[30%]"
                            : ""
                        }
                      ></img>
                    );
                  case 4:
                    return (
                      <img
                        src={item}
                        className={
                          storeProducts[productIndex].productPicture.length ===
                          5
                            ? "h-full w-[50%] object-cover absolute z-10 left-[50%]"
                            : storeProducts[productIndex].productPicture
                                .length === 6
                            ? "h-full w-[50%] object-cover absolute z-10 left-[40%]"
                            : ""
                        }
                      ></img>
                    );
                  case 5:
                    return (
                      <img
                        src={item}
                        className="h-full w-[50%] object-cover absolute z-0 left-[50%] "
                      ></img>
                    );
                }
              })
            : isFetching
            ? ""
            : productPicture &&
              productPicture.map((item, index) => {
                switch (index) {
                  case 0:
                    return (
                      <div className="h-full w-[50%] object-cover z-50 flex items-center relative ">
                        <button className="absolute top-4 left-4 z-30">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-white hover:scale-95 transition-all"
                            onClick={() => setViewImage(true)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                            />
                          </svg>
                        </button>
                        <img
                          src={item}
                          className="h-full w-full object-cover"
                        ></img>
                        <button onClick={handleChangePictureNext(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-14 h-14 absolute right-2 text-white cursor-pointer hover:scale-95"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                        <button onClick={handleChangePicturePrevious(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-14 h-14 absolute left-2 text-white cursor-pointer hover:scale-95"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  case 1:
                    return (
                      <img
                        src={item}
                        className={
                          productPicture && productPicture.length === 2
                            ? "h-full w-[50%] object-cover absolute z-40 left-[50%]"
                            : productPicture && productPicture.length === 3
                            ? "h-full w-[50%] object-cover absolute z-40 left-[25%]"
                            : productPicture && productPicture.length === 4
                            ? "h-full w-[50%] object-cover absolute z-40 left-[16.6%]"
                            : productPicture && productPicture.length === 5
                            ? "h-full w-[50%] object-cover absolute z-40 left-[12.5%]"
                            : productPicture && productPicture.length === 6
                            ? "h-full w-[50%] object-cover absolute z-40 left-[10%]"
                            : ""
                        }
                      ></img>
                    );
                  case 2:
                    return (
                      <img
                        src={item}
                        className={
                          productPicture && productPicture.length === 3
                            ? "h-full w-[50%] object-cover absolute z-30 left-[50%]"
                            : productPicture && productPicture.length === 4
                            ? "h-full w-[50%] object-cover absolute z-30 left-[33.2%]"
                            : productPicture && productPicture.length === 5
                            ? "h-full w-[50%] object-cover absolute z-30 left-[25%]"
                            : productPicture && productPicture.length === 6
                            ? "h-full w-[50%] object-cover absolute z-30 left-[20%]"
                            : ""
                        }
                      ></img>
                    );
                  case 3:
                    return (
                      <img
                        src={item}
                        className={
                          productPicture &&
                          productPicture &&
                          productPicture.length === 4
                            ? "h-full w-[50%] object-cover absolute z-20 left-[50%]"
                            : productPicture &&
                              productPicture &&
                              productPicture.length === 5
                            ? "h-full w-[50%] object-cover absolute z-20 left-[37.5%]"
                            : productPicture &&
                              productPicture &&
                              productPicture.length === 6
                            ? "h-full w-[50%] object-cover absolute z-20 left-[30%]"
                            : ""
                        }
                      ></img>
                    );
                  case 4:
                    return (
                      <img
                        src={item}
                        className={
                          productPicture && productPicture.length === 5
                            ? "h-full w-[50%] object-cover absolute z-10 left-[50%]"
                            : productPicture && productPicture.length === 6
                            ? "h-full w-[50%] object-cover absolute z-10 left-[40%]"
                            : ""
                        }
                      ></img>
                    );
                  case 5:
                    return (
                      <img
                        src={item}
                        className="h-full w-[50%] object-cover absolute z-0 left-[50%] "
                      ></img>
                    );
                }
              })}
          {/* BLACK OVERLAY OVER PICTURES */}
          <div className="h-full w-[50%] absolute left-[50%] bg-black bg-opacity-50 z-40"></div>
        </div>
        {/* DETAILS ABOUT PRODUCT */}
        <div className="h-[50%] w-[75%]  p-4 relative">
          {/* PRODUCT TITLE*/}
          <h1 className="text-6xl">{productTitle}</h1>
          {/* PRODUCT DESCRIPTION */}
          <p className="mt-4"> {productDescription}</p>
          {/* ADD TO CART BUTTON*/}
          <button
            onClick={addProductToCart}
            className="bottom-4 border-2 border-orange-500 text-orange-500 p-4 rounded-lg right-[30%] w-[15%] text-xl hover:bg-orange-500 hover:text-white transition-all absolute"
          >
            Add to cart
          </button>
          {/* BUY NOW BUTTON*/}
          <button className="bottom-4 bg-orange-500 p-4 rounded-lg text-white right-4 w-[25%] text-xl hover:w-[28%] transition-all absolute">
            Buy now
          </button>
          {/* PRODUCT RATING*/}
          <div className="bottom-4 left-4 absolute">
            <h2 className="text-xl">4.5</h2>
          </div>
        </div>
        {/* REVIEWS */}
        <div className="absolute right-0 top-0 h-full w-[25%] border-l-2 border-gray-300 border-opacity-25 ">
          <div className="h-[5%] text-3xl ml-4 mt-4">Reviews</div>
          <div className="h-[20%] bg-red-500 p-4 relative">
            <h1 className="text-xl">Jozef</h1>
            <p>jebene ide te</p>
            <h1 className="bottom-4 left-4 absolute">4.3</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductModal;
