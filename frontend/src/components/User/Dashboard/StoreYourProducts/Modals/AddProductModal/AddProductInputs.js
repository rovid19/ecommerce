import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";
import { setUserFetching } from "../../../../../../app/features/User/isUserFetching";
import { switchValue } from "../../../../../../app/features/getUserTrigger";
import { fetchUserData } from "../../../../../../app/features/User/userSlice";
import { collectionVisible } from "../../../../../../app/features/Store/collections";

const AddProductInputs = ({
  setProductPicture,
  setProductTitle,
  setProductDescription,
  setProductPrice,
  productPrice,
  productPicture,
  productTitle,
  productDescription,
  setIsFetching,
  isFetching,
  setIsVisible,
}) => {
  //states
  const [index, setIndex] = useState();
  const [pictureFetch, setPictureFetch] = useState(null);
  const [collections, setCollections] = useState(null);
  const [collectionIndex, setCollectionIndex] = useState(0);
  const [collectionTrigger, setCollectionTrigger] = useState(false);
  //redux
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const collection = useSelector((state) => state.collection.value);
  const isUserFetching = useSelector((state) => state.isUserFetching.value);
  const user = useSelector((state) => state.userData.value.user);
  const dispatch = useDispatch();

  //functions
  function handleUploadProductPicture(e) {
    if (productPicture.length < 6) {
      setPictureFetch(true);
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
          setPictureFetch(false);
        });
    } else {
      alert("you can only upload 6 pictures");
    }
  }

  function handleAddProduct(e) {
    setIsFetching(true);
    e.preventDefault();
    axios
      .post("/api/store/add-product", {
        productPicture,
        productTitle,
        productDescription,
        productPrice,
        productStore: user.store._id,
        collection: collections,
        collectionId: user.store.storeCollections[collectionIndex]._id,
      })
      .then(() => {
        dispatch(fetchUserData()).unwrap();
      })
      .then(() => {
        setIsFetching(false);
        setIsVisible(false);
      });
  }

  useEffect(() => {
    if (index !== null && index !== undefined) {
      const newArray = productPicture;
      newArray.splice(index, 1);
      setProductPicture(newArray);
      setIndex(null);
    }
  }, [index]);

  // stavi prvu kolekcija usera ko pocetni value za input
  useEffect(() => {
    if (user.store.storeCollections.length > 0) {
      setCollections(user.store.storeCollections[0].collectionName);
      setCollectionTrigger(false);
    } else {
      setCollectionTrigger(true);
    }
  }, []);

  useEffect(() => {
    if (collections) {
      let indexC = 0;
      user.store.storeCollections.forEach((collection, index) => {
        if (collection.collectionName === collections) {
          indexC = index;
        }
      });

      setCollectionIndex(indexC);
    }
  }, [collections]);

  return (
    <>
      {collectionTrigger ? (
        <div className="h-full w-full flex items-center justify-center">
          <h3 className="text-center text-neutral-200">
            In order to add a product, first you have to add a collection.{" "}
            <br />
            <span
              className="font-bold text-white cursor-pointer"
              onClick={() => {
                dispatch(collectionVisible(true));
                setIsVisible(false);
              }}
            >
              Click here
            </span>{" "}
            to add a collection{" "}
          </h3>
        </div>
      ) : (
        <form onSubmit={handleAddProduct} className="h-[95%] bg-neutral-800">
          <div className="lg:h-[350px] h-[300px] rounded-lg w-full overflow-hidden">
            <label
              className={
                productPicture
                  ? "h-full flex items-center justify-center bg-opacity-30 z-20 cursor-pointer group overflow-hidden relative"
                  : "h-full flex items-center justify-center border-b-2 border-t-2 border-gray-300 border-opacity-10 cursor-pointer group relative"
              }
            >
              {pictureFetch ? (
                <div className="h-full w-full absolute top-0 left-0 bg-black bg-opacity-0 flex items-center justify-center">
                  <img src={Loader} alt="Loading" />
                </div>
              ) : (
                <>
                  <input
                    onChange={handleUploadProductPicture}
                    type="file"
                    className="hidden"
                  />

                  {productPicture.length > 0 ? (
                    productPicture.map((item, index) =>
                      index === 0 ? (
                        <div
                          className="relative h-full w-full group"
                          key={index}
                        >
                          {productPicture.length < 6 && (
                            <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-40 text-white">
                              <h1>Add more</h1>
                            </div>
                          )}
                          {/* SVG and other code here */}
                        </div>
                      ) : null
                    )
                  ) : (
                    <h1 className="text-3xl text-neutral-300 group-hover:text-white">
                      Insert Product Picture Here
                    </h1>
                  )}
                </>
              )}
            </label>
          </div>

          <div className="h-[50%] w-full pt-2 pl-2 bg-neutral-800 rounded-md">
            <input
              type="text"
              className="text-xl w-full border-b-2 border-t-2 border-neutral-600 border-opacity-10 p-2 bg-neutral-800 text-white placeholder-neutral-500 h-[15%]"
              placeholder="Name of your product"
              onChange={(e) => setProductTitle(e.target.value)}
            />
            <textarea
              maxLength={500}
              type="text"
              className="text-xl w-full border-b-2 border-neutral-600 border-opacity-10 p-2 bg-neutral-800 text-white placeholder-neutral-500 h-[30%] lg:h-[50%] transition-all"
              placeholder="Description of your product"
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <div className="relative">
              <input
                type="number"
                className="text-xl w-full border-b-2 border-neutral-600 border-opacity-10 p-2 bg-neutral-800 text-white placeholder-neutral-500 h-[15%]"
                placeholder="Price of your product"
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <label className="w-full h-[15%]">
                <h1 className="text-neutral-500 pl-2 text-xl mt-1">
                  Collection:
                </h1>
                <select
                  className="w-full pl-1 text-neutral-400 text-xl border-b-2 border-neutral-600 border-opacity-10 bg-neutral-800"
                  onChange={(e) => setCollections(e.target.value)}
                >
                  {user &&
                    user.store.storeCollections.map((option, index) => (
                      <option
                        value={option.collectionName}
                        className="text-neutral-400 bg-neutral-800"
                        key={index}
                      >
                        {option.collectionName}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <button className="bg-orange-500 text-white rounded-md w-[20%] h-[40px] hover:w-[30%] transition-all lg:mt-5 absolute bottom-6 lg:bottom-4">
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddProductInputs;
