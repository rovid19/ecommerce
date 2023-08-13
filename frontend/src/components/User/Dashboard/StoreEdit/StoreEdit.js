import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import StoreProductCard from "../../Store/StoreProductCard";
import { useDispatch, useSelector } from "react-redux";
import { switchValue } from "../../../../app/features/getUserTrigger";
import Loader from "../../../../assets/svg-loaders/three-dots.svg";
import StoreSavedModal from "./Modals/StoreSavedModal";
import StoreDeleteProductModal from "./Modals/StoreDeleteProductModal.js";
import { useNavigate } from "react-router-dom";
import { getStoreSubPage } from "../../../../app/features/storeSubPage";
import { setEditMode } from "../../../../app/features/Store/storeEditMode";
import StoreEditInfo from "./StoreEditInfo.js";
import { fetchUserData } from "../../../../app/features/User/userSlice";

const StoreEdit = () => {
  // states
  const [name, setName] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // redux
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.value.user);
  const editMode = useSelector((state) => state.editMode.value);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const userStoreProducts = useSelector(
    (state) => state.userData.value.products
  );
  const { store } = user;

  const dispatch = useDispatch();

  // applying changes made on your store // functions
  function handleSaveStore() {
    setIsLoading(true);
    axios
      .put("/api/store/edit-store", {
        name: name ? name : user.store.storeName,
        profilePhoto: profilePhoto ? profilePhoto : user.store.storeProfile,
        coverPhoto: coverPhoto ? coverPhoto : user.store.storeCover,
        address: address ? address : user.store.storeAddress,
        description: description ? description : user.store.storeDescription,
      })
      .then(() => {
        dispatch(fetchUserData());
        setIsVisible(!isVisible);
        setIsLoading(false);
      });
  }

  // if user isn't logged in, redirect him to homepage

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  // object used for setting store cover photo
  const styles = {
    backgroundImage: coverPhoto
      ? `url(${coverPhoto})`
      : `url(${user.store.storeCover})`,
  };

  /*const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  function handleProductSort() {
    let _storeProducts = [...storeProducts];
    const draggedItemContent = _storeProducts.splice(dragItem.current, 1)[0];
    _storeProducts.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    dispatch(addStoreProducts(_storeProducts));
  }*/

  return (
    <div
      className={
        storeSubPage === "editStore"
          ? " h-full w-full store  bg-neutral-800"
          : "hidden"
      }
    >
      {isLoading && (
        <div className="h-full w-full absolute top-0 left-0 z-50 bg-neutral-900 bg-opacity-40 flex items-center justify-center">
          <img src={Loader} />
        </div>
      )}
      {isVisible && <StoreSavedModal setIsVisible={setIsVisible} />}
      {isVisible ? (
        ""
      ) : (
        // Save Button
        <button
          onClick={() => {
            setCurrentPhoto("save");
            handleSaveStore();
          }}
          className={
            editMode
              ? "absolute z-30 right-5 top-5 w-[100px] h-[50px] bg-orange-600 opacity-100  text-white rounded-xl hover:scale-95 shadow-xl transition-all flex items-center justify-center"
              : "hidden opacity-0"
          }
        >
          {!isLoading && "Save"}
        </button>
      )}
      <div
        className={
          editMode
            ? "h-[35%] relative bg-cover border-8 border-orange-500 transition-all"
            : "h-[35%] relative bg-cover transition-all"
        }
        style={user ? styles : ""}
      >
        <StoreEditInfo
          setName={setName}
          coverPhoto={coverPhoto}
          setCoverPhoto={setCoverPhoto}
          setProfilePhoto={setProfilePhoto}
          setAddress={setAddress}
          setDescription={setDescription}
          setCurrentPhoto={setCurrentPhoto}
          isLoading={isLoading}
          currentPhoto={currentPhoto}
          setIsLoading={setIsLoading}
          profilePhoto={profilePhoto}
          description={description}
        />
      </div>

      <div className=" gap-2 h-[55%] lg:h-[65%] w-full   relative">
        <div
          className={
            editMode
              ? "h-full w-full absolute top-0 left-0 z-20 cursor-pointer group flex items-center justify-center bg-black bg-opacity-50 transition-all"
              : "h-full w-full absolute top-0 left-0 z-20 cursor-pointer group flex items-center justify-center bg-black bg-opacity-50"
          }
        >
          <button
            onClick={() => {
              navigate(`/dashboard/${user.storeName}/products`);
              dispatch(getStoreSubPage("products"));
            }}
            className={
              editMode
                ? "text-white hidden transition-all text-xl lg:text-2xl 2xl:text-3xl bg-orange-500 p-10 rounded-xl hover:scale-95"
                : "text-white invisible group-hover:block transition-all text-xl lg:text-2xl 2xl:text-3xl bg-orange-500 p-10 rounded-xl hover:scale-95"
            }
          >
            Click here to add or edit products
          </button>
        </div>
        {store.storeCollections &&
          store.storeCollections.map((collection, i) => {
            if (i === 0) {
              return (
                <article className="h-full w-full fl overflow-x-auto bg-neutral-800 relative ">
                  <div className="h-[13%] lg:h-[10%] p-2 lg:p-4 text-xl uppercase font-bold bg-neutral-900 text-neutral-300">
                    <h1>{collection.collectionName}</h1>
                  </div>
                  <div className="h-[87%] lg:h-[90%] min-w-min bg-neutral-800 gap-4 flex p-4  ">
                    {collection.collectionProducts &&
                      collection.collectionProducts.map((product, index) => {
                        return (
                          <div className="h-full w-[200px] lg:w-[300px] flex items-center justify-center pt-4 pb-4 flex-shrink-0 relative">
                            <StoreProductCard storeProducts={product} />
                            {product.productDragged && (
                              <div className="drag-indicator "></div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </article>
              );
            }
          })}
      </div>
    </div>
  );
};

export default StoreEdit;
