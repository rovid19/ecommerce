import React, { useEffect, useRef, useState } from "react";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { collectionVisible } from "../../../../../../app/features/Store/collections";
import axios from "axios";
import { fetchUserData } from "../../../../../../app/features/User/userSlice";

const AddCollectionModal = () => {
  const [collection, setCollection] = useState(null);
  const [collectionInput, setCollectionInput] = useState(null);
  const [oldCollectionName, setOldCollectionName] = useState(null);
  const [useEffectTrigger, setUseEffectTrigger] = useState(false);
  const [item, setItem] = useState(undefined);
  const [imeKolekcije, setImeKolekcije] = useState(undefined);
  const [edit, setEdit] = useState(false);
  const [placeHolderIndex, setPlaceHolderIndex] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState(null);

  //states
  const inputRef = useRef(null);
  const userData = useSelector((state) => state.userData.value.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/user/get-collections")
      .then(({ data }) => setCollection(data));
  }, [useEffectTrigger]);
  async function handleCollectionNameChange(e) {
    e.preventDefault();
    await axios.post("/api/user/collection-name-change", {
      newCollectionName,
      storeId: userData.store._id,
      index: placeHolderIndex,
      oldCollectionName,
    });
    setEdit(!edit);
    setUseEffectTrigger(!useEffectTrigger);
  }
  async function handleAddCollection(e) {
    e.preventDefault();
    await axios.post("/api/user/add-collection", {
      collectionInput,
      storeId: userData.store._id,
    });
    inputRef.current.value = "";
    dispatch(fetchUserData());
    setUseEffectTrigger(!useEffectTrigger);
  }

  useEffect(() => {
    if (item >= 0) {
      async function handleDeleteCollection() {
        await axios.post("/api/user/delete-collection", {
          itemName: item,
          storeId: userData.store._id,
          imeKolekcije,
        });
        setUseEffectTrigger(!useEffectTrigger);
        setItem(undefined);
      }
      handleDeleteCollection();
    }
  }, [item]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 bg-opacity-40 z-50 absolute top-0 left-0">
      <div className="w-[85%] h-[70%]  lg:w-[35%] lg:h-[70%] bg-neutral-800 text-neutral-300 p-4 rounded-lg relative ">
        {edit && (
          <div className="h-full w-full bg-black bg-opacity-20 z-30 flex justify-center absolute top-0 left-0 rounded-md items-center">
            <form
              className="w-[90%] h-[50%] bg-neutral-700 fl2 relative rounded-md "
              onSubmit={handleCollectionNameChange}
            >
              <button
                onClick={() => setEdit(!edit)}
                className="absolute top-4 left-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 bg-neutral-600 rounded-md text-white hover:bg-orange-500 transition-all "
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>{" "}
              <input
                placeholder={collection[placeHolderIndex]}
                className="w-[80%] h-[30%] text-3xl p-4 bg-neutral-600 rounded-md text-white"
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              <button className="absolute bottom-4 w-[20%] bg-orange-500 text-white p-2 rounded-md hover:w-[25%] transition-all">
                {" "}
                Save{" "}
              </button>
            </form>
          </div>
        )}
        <div className="h-[5%]">
          <button onClick={() => dispatch(collectionVisible(false))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-neutral-300 rounded-md  hover:bg-orange-500 hover:text-white "
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <form
          className="w-full h-[85%] relative"
          onSubmit={handleAddCollection}
        >
          <div className="h-[20%] w-full relative mt-6 mb-4">
            <h1 className="text-xl h-[30%] ">Add a new collection</h1>
            <input
              className=" text-3xl p-2 h-[70%] w-full rounded-md bg-neutral-600 text-white"
              onChange={(e) => setCollectionInput(e.target.value)}
              ref={inputRef}
            />
            <button className="absolute right-0 h-[70%] text-5xl w-[15%] bg-neutral-700 hover:bg-orange-500 text-white rounded-r-md">
              +
            </button>
          </div>
          <div className="h-[80%] overflow-scroll scrollbar-hide">
            {collection &&
              collection.map((item, index) => {
                return (
                  <article
                    className="h-[15%] w-full mt-1 relative p-4 flex items-center rounded-md bg-neutral-900"
                    key={index}
                  >
                    {<h1 className="text-2xl">{item}</h1>}
                    <button
                      className="absolute right-10 top-0 h-full grid place-items-center "
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit(!edit);
                        setPlaceHolderIndex(index);
                        setOldCollectionName(item);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6 hover:text-orange-500 transition-all"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </button>
                    <button
                      className="absolute right-3 top-0 h-full grid place-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setItem(index);
                        setImeKolekcije(item);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 hover:text-orange-500 transition-all"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </article>
                );
              })}
          </div>
        </form>
        <div className="h-[10%] w-full absolute bottom-0 left-0 "></div>
      </div>
    </div>
  );
};

export default AddCollectionModal;
