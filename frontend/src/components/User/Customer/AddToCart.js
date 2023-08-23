import React from "react";
import axios from "axios";
import { setCartVisible } from "../../../app/features/User/cartVisible";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { removeCartItem } from "../../../app/features/User/cartItems";
import { fetchUserData } from "../../../app/features/User/userSlice";
import { setCartClassname } from "../../../app/features/triggeri";

const AddToCart = () => {
  // STATES
  const [date, setDate] = useState(new Date());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(null);
  const [deleteItem, setDeleteItem] = useState(false);
  const [username, setUsername] = useState(null);
  const [boughtItems, setBoughtItems] = useState([]);
  const dispatch = useDispatch();

  // REDUX
  const user = useSelector((state) => state.userData.value.user);
  const storeId = useSelector((state) => state.storeId.value);
  const cartItems = useSelector((state) => state.cartItems.value);
  const cartClassname = useSelector(
    (state) => state.triggeri.value.cartClassname
  );
  const mobileActive = useSelector(
    (state) => state.triggeri.value.mobileActive
  );

  // OTHER
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  // USEEFFECTS
  useEffect(() => {
    if (deleteItem) {
    } else {
      //setQuantity(Array(cartItems.length).fill(1));
      setQuantity((prev) => [...prev, 1]);
    }
  }, [cartItems]);

  useEffect(() => {
    if (boughtItems.length > 0) {
      handleBuyNow();
    }
  }, [boughtItems]);

  useEffect(() => {
    if (deleteItem) {
      let newArray = [...quantity];
      newArray.splice(index, 1);
      setQuantity(newArray);
      dispatch(removeCartItem(index));
      setDeleteItem(false);
      setIndex(null);
    }
  }, [index]);

  useEffect(() => {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        total = total + item.productNewPrice;
      });
    }

    setTotal(total);
  }, [cartItems]);

  // FUNCTIONS
  function handleBoughtProducts() {
    const newArray = cartItems.map((item) => {
      return item._id;
    });
    setBoughtItems(newArray);
  }

  function handleBuyNow() {
    if (user && Object.keys(user).length > 0) {
      axios
        .post("/api/customer/buy-product", {
          boughtItems,
          quantity,
          formattedDate,
          storeId,
          username,
          total,
        })
        .then(() => {
          dispatch(fetchUserData());
        });
    } else {
      alert("you must make an account in order to buy this product");
    }
  }

  return (
    <div className={cartClassname}>
      <div className="flex border-b-2 border-neutral-600 border-opacity-20 h-[5%] p-1">
        <button
          onClick={() => {
            dispatch(
              setCartClassname(cartClassname.replace("cartOpen", "cartClose"))
            );
            setTimeout(() => {
              dispatch(
                setCartClassname(cartClassname.replace("cartClose", ""))
              );
              dispatch(setCartVisible(false));
            }, [500]);
          }}
          className="bg-neutral-700 rounded-md text-neutral-400 hover:text-white transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h1 className="ml-4 text-xl 2xl:text-2xl">Cart</h1>
      </div>
      <div className="h-[85%] scrollbar-hide border-b-2 border-neutral-600 border-opacity-20 pb-2 overflow-scroll  ">
        {cartItems.map((item, index) => {
          return (
            <div
              className="h-[15%] bg-neutral-700 bg-opacity-50 flex items-center  mt-1 relative rounded-md p-4 group cursor-pointer"
              key={index}
            >
              <button
                className="absolute left-2 top-2 text-white lg:invisible visible lg:group-hover:visible "
                onClick={() => {
                  setIndex(index);
                  setDeleteItem(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-neutral-300 bg-orange-500 p-1 rounded-md hover:text-white hover:bg-orange-500 transition-all "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              <img
                src={item.productPicture[0]}
                className="w-[35%] h-full object-cover rounded-sm"
              ></img>
              <div className="ml-2 h-full w-[50%] ">
                <div className="h-[40%] lg:h-[60%]">
                  <h1 className="text-base lg:text-base 2xl:text-xl ">
                    {item.productName.length > 25 && !mobileActive
                      ? item.productName.slice(0, 25) + ".."
                      : item.productName.length > 9 && mobileActive
                      ? item.productName.slice(0, 9) + ".."
                      : item.productName}
                  </h1>
                </div>
                <div className=" h-[20%] lg:h-[40%] lg:pt-1">
                  <h2 className="">{item.productNewPrice}$</h2>
                </div>
              </div>
              <div className="h-full absolute right-2 ">
                <div className=" h-full fl2 ">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      onClick={() => {
                        let newArray = [...quantity];
                        let productPrice = item.productNewPrice;
                        let newNumber = newArray[index] + 1;
                        newArray.splice(index, 1);
                        newArray.splice(index, 0, newNumber);
                        setQuantity(newArray);

                        setTotal((prev) => prev + productPrice);
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <h1 className="text-center">{quantity && quantity[index]}</h1>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      onClick={() => {
                        if (quantity[index] === 1) {
                          setSelectedProduct(item._id);
                        } else {
                          // onclick povecanja kolicine proizvoda
                          let newArray = [...quantity];
                          let newNumber = newArray[index] - 1;
                          newArray.splice(index, 1);
                          newArray.splice(index, 0, newNumber);
                          setQuantity(newArray);
                          // zbrajanje totala
                          let productPrice = item.productNewPrice;
                          setTotal((prev) => prev - productPrice);
                        }
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" h-[10%] flex relative p-4 items-center ">
        {" "}
        <h1 className="text-lg xl:text-xl text-neutral-400">Total: {total}$</h1>
        <button
          onClick={handleBoughtProducts}
          className="absolute right-0 bg-orange-500 text-white  h-[50%] lg:h-[40%] rounded-md w-[40%] lg:w-[40%]  hover:w-[50%] transition-all "
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
