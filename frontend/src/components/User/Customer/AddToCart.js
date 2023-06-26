import React from "react";
import axios from "axios";
import { setCartVisible } from "../../../app/features/User/cartVisible";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { switchValue } from "../../../app/features/getUserTrigger";
import { removeCartItem } from "../../../app/features/User/cartItems";

const AddToCart = () => {
  const [date, setDate] = useState(new Date());
  // const [cartItems, setCartItems] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(null);
  const [deleteItem, setDeleteItem] = useState(false);
  const [username, setUsername] = useState(null);
  const [boughtItems, setBoughtItems] = useState([]);
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.cartVisible.value);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const user = useSelector((state) => state.userData.value.user);
  const storeId = useSelector((state) => state.storeId.value);
  const cartItems = useSelector((state) => state.cartItems.value);

  // date
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  /* useEffect(() => {
    axios.get("/api/customer/get-products-from-cart", {}).then(({ data }) => {
      //setCartItems(data);
      setUsername(user.username);
    });
  }, [getUserTrigger]); */

  useEffect(() => {
    if (deleteItem) {
    } else {
      //setQuantity(Array(cartItems.length).fill(1));
      setQuantity((prev) => [...prev, 1]);
    }
  }, [cartItems]);

  /*useEffect(() => {
    if (selectedProduct) {
      axios
        .post("/api/customer/remove-product-from-cart", { selectedProduct })
        .then(() => {
          dispatch(switchValue(!getUserTrigger));
          setTrigger(!trigger);
        });
    }
  }, [selectedProduct]);*/

  useEffect(() => {
    if (boughtItems.length > 0) {
      handleBuyNow();
    }
  }, [boughtItems]);

  useEffect(() => {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        total = total + item.productNewPrice;
      });
    }

    setTotal(total);
  }, [cartItems]);

  function handleBoughtProducts() {
    const newArray = cartItems.map((item) => {
      return item._id;
    });
    setBoughtItems(newArray);
  }

  function handleBuyNow() {
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
        dispatch(switchValue(!getUserTrigger));
      });
  }

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

  return (
    <div
      className={
        cartVisible
          ? "animacija  bg-neutral-800  text-neutral-300 shadow-xl p-3 z-50 fixed top-0 right-0  h-full"
          : "closingAnimacija bg-neutral-800  text-neutral-300 shadow-xl p-3 z-50 fixed top-0 right-0 h-full"
      }
    >
      <div className="flex border-b-2 border-neutral-600 border-opacity-20 h-[5%] p-1">
        <button
          onClick={() => dispatch(setCartVisible(false))}
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
        <h1 className="ml-4 text-2xl">Cart</h1>
      </div>
      <div className="h-[85%] scrollbar-hide border-b-2 border-neutral-600 border-opacity-20 pb-2 overflow-scroll  ">
        {cartItems.map((item, index) => {
          return (
            <div
              className="h-[15%] bg-neutral-700 bg-opacity-50 flex items-center  mt-1 relative rounded-md p-4"
              key={index}
            >
              <button
                className="absolute right-0 top-0 text-white"
                onClick={() => {
                  setIndex(index);
                  setDeleteItem(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <img
                src={item.productPicture[0]}
                className="w-[35%] h-full object-cover rounded-sm"
              ></img>
              <div className="ml-2 h-full w-[50%]">
                <h1 className="text-2xl ">{item.productName}</h1>
                <h2 className="">{item.productNewPrice}$</h2>
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
      <div className=" h-[10%] flex relative p-4 ">
        {" "}
        <h1 className="text-xl text-neutral-400">Total: {total}$</h1>
        <button
          onClick={handleBoughtProducts}
          className="absolute right-0 bg-orange-500 text-white h-[40%] rounded-md w-[30%] hover:w-[40%] transition-all "
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
