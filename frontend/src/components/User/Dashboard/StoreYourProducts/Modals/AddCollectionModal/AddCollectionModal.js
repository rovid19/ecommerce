import React, { useEffect, useState } from "react";
import Loader from "../../../../../../assets/svg-loaders/three-dots.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { collectionVisible } from "../../../../../../app/features/Store/collections";
import axios from "axios";
import { fetchUserData } from "../../../../../../app/features/User/userSlice";

const AddCollectionModal = () => {
  const [collection, setCollection] = useState(null);
  const [collectionInput, setCollectionInput] = useState(null);
  const [useEffectTrigger, setUseEffectTrigger] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    axios
      .get("/api/user/get-collections")
      .then(({ data }) => setCollection(data));
  }, [useEffectTrigger]);
  async function handleAddCollection(e) {
    e.preventDefault();
    await axios.post("/api/user/add-collection", {
      collectionInput,
      storeId: userData.store._id,
    });
    dispatch(fetchUserData()).unwrap();
    setUseEffectTrigger(!useEffectTrigger);
  }

  useEffect(() => {
    if (item) {
      async function handleDeleteCollection() {
        await axios.post("/api/user/delete-collection", {
          item,
          storeId: userData.store._id,
        });
        setUseEffectTrigger(!useEffectTrigger);
      }
      handleDeleteCollection();
    }
  }, [item]);
  console.log(collection);
  //states
  const userData = useSelector((state) => state.userData.value.user);
  const dispatch = useDispatch();
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50 absolute top-0 left-0">
      <div className="w-[85%] h-[70%]  lg:w-[35%] lg:h-[70%] bg-white p-4 rounded-lg relative ">
        <div className="h-[5%]">
          <button onClick={() => dispatch(collectionVisible(false))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 bg-orange-500 rounded-sm text-white hover:scale-90 transition-all "
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <form
          className="w-full h-[85%] relative"
          onSubmit={handleAddCollection}
        >
          <div className="h-[20%] w-full relative mt-6 bg-yellow-500 grid grid-rows-2">
            <h1 className="text-2xl ">Add a new collection</h1>
            <input
              className=" text-3xl p-2 h-full w-full border-2 border-gray-300 border-opacity-40"
              onChange={(e) => setCollectionInput(e.target.value)}
            />
            <button className="absolute right-0 h-full text-5xl w-[15%] bg-gray-300 hover:bg-orange-500 text-white">
              +
            </button>
          </div>
          <div className="h-[80%] overflow-scroll">
            {collection &&
              collection.map((item, index) => {
                return (
                  <article className="h-[10%] w-full bg-gray-50 mt-1 relative">
                    {<h1 className="text-2xl">{item}</h1>}
                    <button
                      className="absolute right-0 top-0 h-full grid place-items-center"
                      onClick={() => setItem(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </article>
                );
              })}
          </div>
        </form>
        <div className="h-[10%] w-full absolute bottom-0 left-0 ">
          <button className="h-[70%] w-[20%] bg-orange-500 text-white rounded-md hover:w-[30%] transition-all ml-6 ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCollectionModal;
