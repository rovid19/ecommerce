import React from "react";
import axios from "axios";
import { setCartVisible } from "../../../app/features/User/cartVisible";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { switchValue } from "../../../app/features/getUserTrigger";

const AddToCart = () => {
  const [date, setDate] = useState(new Date());
  const [cartItems, setCartItems] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [total, setTotal] = useState(0);
  const [username, setUsername] = useState(null);
  const [boughtItems, setBoughtItems] = useState([]);
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.cartVisible.value);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const user = useSelector((state) => state.user.value);
  const storeId = useSelector((state) => state.storeId.value);

  // date
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    axios.get("/api/customer/get-products-from-cart", {}).then(({ data }) => {
      setCartItems(data);
      setUsername(user.username);
    });
  }, [getUserTrigger]);

  useEffect(() => {
    if (cartItems) {
      setQuantity(Array(cartItems.length).fill(1));
      totalCounter();
    }
  }, [cartItems]);

  useEffect(() => {
    if (selectedProduct) {
      axios
        .post("/api/customer/remove-product-from-cart", { selectedProduct })
        .then(() => {
          dispatch(switchValue(!getUserTrigger));
          setTrigger(!trigger);
        });
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (boughtItems) {
      handleBuyNow();
    }
  }, [boughtItems]);

  function totalCounter() {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        total = total + item.productNewPrice;
      });
    }

    setTotal(total);
  }

  function arraySort() {
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
  console.log(user._id);
  return (
    <div
      className={
        cartVisible
          ? "animacija  bg-white shadow-xl p-3 z-50"
          : "closingAnimacija bg-white shadow-xl p-3 z-50"
      }
    >
      <div className="flex border-b-2 border-gray-300 border-opacity-20 pb-2 mt-2">
        <button
          onClick={() => dispatch(setCartVisible(false))}
          className="bg-orange-500 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <h1 className="ml-4 text-2xl">Cart</h1>
      </div>
      <div className="h-[90%] border-b-2 border-gray-300 border-opacity-20 pb-2 overflow-scroll pt-2 ">
        {cartItems &&
          cartItems.map((item, index) => {
            return (
              <div className="h-[15%] bg-gray-300 bg-opacity-50 flex items-center pt-2 pb-2 pl-2 mt-1 relative">
                <button
                  className="absolute left-1 top-1 text-white"
                  onClick={() => setSelectedProduct(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <img
                  src={item.productPicture[0]}
                  className="w-[35%] h-full object-cover rounded-sm"
                ></img>
                <div className="ml-2">
                  <h1 className="text-2xl ">{item.productName}</h1>
                  <h2 className="mt-2">{item.productNewPrice}$</h2>
                </div>
                <div className="h-full absolute right-2 ">
                  <div className=" h-full fl2 ">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5"
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
                          fill-rule="evenodd"
                          d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <h1 className="text-center">
                      {quantity && quantity[index]}
                    </h1>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5"
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
                          fill-rule="evenodd"
                          d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="p-2 h-[4.5%] flex relative items-center ">
        {" "}
        <h1 className="text-xl">Total: {total}$</h1>
        <button
          onClick={() => arraySort()}
          className="absolute right-0 bg-orange-500 text-white h-[80%] rounded-md w-[20%] hover:scale-95 "
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
