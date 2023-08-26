import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEditProductModal } from "../../../../../../app/features/Store/Dashboard/editProductModal";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";
import { useEffect, useState } from "react";
import {
  fetchStoreProducts,
  fetchUserData,
} from "../../../../../../app/features/User/userSlice";
const EditProductInputs = ({
  setProductPicture,
  setProductTitle,
  setProductDescription,
  setProductPrice,
  productPrice,
  productPicture,
  productTitle,
  productDescription,
  setIsFetching,
  currentProduct,
  discountInput,
  setDiscountInput,
}) => {
  // STATES
  const [index, setIndex] = useState();
  const [collectionValue, setCollectionValue] = useState(null);
  const [picFetch, setPicFetch] = useState(false);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [oldCollection, setOldCollection] = useState(null);
  const [oldCollectionId, setOldCollectionId] = useState(null);
  const [productNewPrice, setProductNewPrice] = useState(null);
  const [saleVisible, setSaleVisible] = useState(false);

  // REDUX
  const user = useSelector((state) => state.userData.value.user);
  const selectedProduct = useSelector((state) => state.selectedProduct.value);

  // OTHER
  const dispatch = useDispatch();

  // USEEFFECTS
  useEffect(() => {
    if (currentProduct) {
      setCollectionValue(currentProduct.productCollection);
      setOldCollection(currentProduct.productCollection);
    }
  }, [currentProduct]);
  useEffect(() => {
    if (index !== null && index !== undefined) {
      const newArray = productPicture;
      newArray.splice(index, 1);
      setProductPicture(newArray);
      setIndex(null);
    }
  }, [index]);

  //trazenje indexa nove kolekcije
  useEffect(() => {
    if (collectionValue) {
      let indexC = 0;
      user.store.storeCollections.forEach((collection, index) => {
        if (collection.collectionName === collectionValue) {
          indexC = index;
        }
      });

      setCollectionIndex(indexC);
    }
  }, [collectionValue]);
  // trazenje indexa stare kolekcije
  useEffect(() => {
    if (oldCollection) {
      let indexC = 0;
      user.store.storeCollections.forEach((collection, index) => {
        if (collection.collectionName === collectionValue) {
          indexC = index;
        }
      });

      setOldCollectionId(user.store.storeCollections[indexC]._id);
    }
  }, [oldCollection]);

  // Izracun cijene popusta na proizvod
  useEffect(() => {
    if (discountInput > 0) {
      if (productNewPrice > 0) {
      }
      const oldPrice = productPrice;
      const oduzmi = (oldPrice * discountInput) / 100;
      const newPrice = oldPrice - oduzmi;
      setProductNewPrice(newPrice);
    } else if (discountInput && discountInput.length === 0) {
      setProductNewPrice(productPrice);
    }
  }, [discountInput]);

  // FUNCTIONS
  function handleEditProduct(e) {
    setIsFetching(true);
    e.preventDefault();
    axios
      .put("/api/store/edit-product", {
        selectedProduct,
        productPicture,
        productTitle,
        productDescription,
        productPrice,
        salePercentage: discountInput,
        collection: collectionValue,
        collectionId: user.store.storeCollections[collectionIndex]._id,
        oldCollection,
        oldCollectionId,
      })
      .then(() => {
        dispatch(fetchUserData()).unwrap();
      })
      .then(() => {
        setIsFetching(false);
        dispatch(fetchStoreProducts());
        dispatch(setEditProductModal(false));
      });
  }
  function handleUploadProductPicture(e) {
    if (productPicture.length < 6) {
      setPicFetch(true);
      const file = e.target.files;

      const formData = new FormData();
      formData.append("photo", file[0]);

      axios
        .post("/api/store/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(({ data }) => {
          let newArray = productPicture;
          newArray.push(data);
          setProductPicture(newArray);
          setPicFetch(false);
        });
    } else {
      alert("you can only upload 6 pictures");
    }
  }

  // Izracun cijene proizvoda ako popust vec postoji
  const calculateOriginalPrice = () => {
    const popustDecimal = discountInput / 100;
    const oldPrice = productPrice;
    const newPrice = oldPrice / (1 - popustDecimal);

    setProductNewPrice(newPrice);
    setProductPrice(newPrice);
    setDiscountInput(0);
  };

  return (
    <form onSubmit={handleEditProduct} className="h-[95%]">
      {saleVisible && (
        <div className="h-full w-full bg-neutral-900 bg-opacity-50  absolute top-0 left-0 zeze flex items-center justify-center rounded-md">
          <div className="h-[50%] w-[80%] bg-neutral-800 relative flex items-center justify-center rounded-md">
            {" "}
            <button
              className="absolute top-2 left-2"
              onClick={(e) => {
                e.preventDefault();
                setSaleVisible(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8 text-neutral-300 hover:bg-orange-500 hover:text-white rounded-md p-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div className="h-[80%] w-[80%] fl2 text-neutral-300 relative ">
              <h1 className="text-2xl lg:text-4xl mb-2">Enter discount</h1>
              <div className="relative w-full lg:w-[50%] h-[50px] ">
                <input
                  value={discountInput}
                  min="0"
                  max="100"
                  type="number"
                  className=" h-full w-full text-2xl text-neutral-900 text-center rounded-md"
                  onChange={(e) => {
                    if (e.target.value > 100) {
                      alert("you can only use numbers from 0 to 100");
                    } else {
                      setDiscountInput(e.target.value);
                    }
                  }}
                />
                <h1 className="absolute right-2 top-0 h-full flex items-center text-xl text-neutral-800">
                  %
                </h1>
              </div>
              <div className="flex items-center gap-2 justify-center h-[50px] mt-2 ">
                <h2 className="text-xl lg:text-2xl ">New price:</h2>
                <h1 className="bg-orange-500 text-white p-1 lg:p-2 rounded-md text-xl ">
                  {Math.floor(productNewPrice)}$
                </h1>
              </div>
              <button
                onClick={() => {
                  setProductPrice(productNewPrice);
                  setSaleVisible(false);
                }}
                className="absolute bottom-2 bg-orange-500 lg:bg-transparent text-white rounded-md lg:border-2 lg:border-orange-500 w-[50%] h-[12%] lg:w-[30%] lg:h-[15%] hover:bg-orange-500 transition-all "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="lg:h-[350px] h-[300px] rounded-lg w-full overflow-hidden relative">
        {discountInput > 0 && (
          <div className="h-[50px] w-[50px] bg-orange-500 rounded-full absolute top-2 left-2 zeze flex items-center justify-center ">
            <h1 className="text-white ">
              <span className="text-xl">{discountInput}</span>%
            </h1>
          </div>
        )}
        <label
          className={
            productPicture
              ? "h-full  flex items-center justify-center  bg-opacity-30 z-20 cursor-pointer group overflow-hidden relative"
              : "h-full flex items-center justify-center border-b-2 border-t-2 border-gray-300 border-opacity-10 cursor-pointer group  relative"
          }
        >
          {picFetch ? (
            <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-0 flex items-center justify-center">
              <img src={Loader} />
            </div>
          ) : (
            <>
              <input
                onChange={handleUploadProductPicture}
                type="file"
                className="hidden"
              />
              {productPicture.length > 0 ? (
                <>
                  {productPicture.map((item, index) => {
                    if (index === 0) {
                      return (
                        <div
                          className="relative h-full w-full group "
                          key={index}
                        >
                          {productPicture.length < 6 && (
                            <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-20 text-white group">
                              {" "}
                              <h1 className="group-hover:text-2xl transition-all">
                                {" "}
                                Add more{" "}
                              </h1>
                            </div>
                          )}

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8 text-white hover:bg-orange-500    absolute bg-neutral-600 rounded-l-md rounded-b-md top-0 p-1 right-0 invisible group-hover:visible"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIndex(index);
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <img
                            src={item}
                            className="w-full h-full object-cover"
                          ></img>
                        </div>
                      );
                    }
                  })}
                  <div className="absolute w-full h-[30%] flex bottom-0 z-50 group">
                    {productPicture.map((item, index) => {
                      if (index > 0) {
                        return (
                          <div className="relative w-[20%] h-full" key={index}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 text-white hover:bg-orange-500 absolute bg-neutral-600 rounded-t-md rounded-r-md bottom-0 p-1 left-0 invisible group-hover:visible"
                              onClick={(e) => {
                                setIndex(index);
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <img
                              src={item}
                              className="w-full h-full object-cover rounded-md"
                            ></img>{" "}
                          </div>
                        );
                      }
                    })}
                  </div>
                  ;
                </>
              ) : (
                <h1 className="text-3xl text-gray-300 group-hover:text-gray-500">
                  Insert Product Picture Here
                </h1>
              )}
            </>
          )}
        </label>
      </div>
      <div className="h-[50%] w-full pt-2 pl-2  ">
        <input
          type="text"
          className="text-xl w-full border-b-2  border-neutral-600 border-opacity-10 p-2 bg-neutral-800  text-white placeholder-neutral-500 h-[15%]"
          placeholder="Name of your product"
          onChange={(e) => setProductTitle(e.target.value)}
          defaultValue={currentProduct && currentProduct.productName}
        />
        <textarea
          maxLength={500}
          type="text"
          className="text-xl w-full border-b-2 border-neutral-600 border-opacity-10 p-2 bg-neutral-800 text-white placeholder-neutral-500 h-[30%] lg:h-[50%]"
          placeholder="Description of your product"
          onChange={(e) => setProductDescription(e.target.value)}
          defaultValue={currentProduct && currentProduct.productDescription}
        />{" "}
        <div className="relative ">
          <div className="w-full relative">
            <input
              type="number"
              className="text-xl  w-full border-b-2 border-neutral-600 border-opacity-10 p-2 bg-neutral-800 text-white placeholder-neutral-500 h-[15%]"
              placeholder="Price of your product"
              onChange={(e) => setProductPrice(Number(e.target.value))}
              defaultValue={productPrice ? Math.floor(productPrice) : ""}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (discountInput > 0) {
                  calculateOriginalPrice();
                } else {
                  setSaleVisible(true);
                  setProductNewPrice(productPrice);
                }
              }}
              className="absolute right-0 top-0 h-full border-2 border-orange-500 bg-nuetral-800 z-50 p-1 text-neutral-300 rounded-md hover:bg-orange-500 hover:text-white"
            >
              {discountInput > 0
                ? "Remove product from sale"
                : "Add product on sale"}
            </button>
          </div>
          <label className="w-full   ">
            <h1 className="text-neutral-500 pl-2 text-xl mt-1">Collection:</h1>
            <select
              className="w-full pl-1 text-white text-xl border-b-2 border-neutral-600 border-opacity-10 bg-neutral-800 h-[15%]"
              onChange={(e) => setCollectionValue(e.target.value)}
              value={collectionValue}
            >
              {collectionValue === "" && <option></option>}
              {user &&
                user.store.storeCollections.map((option, index) => {
                  return (
                    <option
                      value={option.collectionName}
                      className=" text-gray-400"
                      key={index}
                    >
                      {option.collectionName}
                    </option>
                  );
                })}
            </select>
          </label>
        </div>
        <button className="bg-orange-500 text-white rounded-md w-[20%] h-[40px] hover:w-[30%] transition-all lg:mt-5 absolute bottom-6 lg:bottom-4">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProductInputs;
