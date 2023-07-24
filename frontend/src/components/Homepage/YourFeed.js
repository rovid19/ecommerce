import React, { useState } from "react";
import { useSelector } from "react-redux";
import VideoUploadModal from "./VideoUploadModal";
import AddProductModal from "./AddProductModal";
import VideoPlayerModal from "./VideoPlayerModal";

const YourFeed = () => {
  const [text, setText] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [videoPlayerModalVisible, setVideoPlayerModalVisible] = useState(false);

  const user = useSelector((state) => state.userData.value.user);
  console.log(video);
  return (
    <section className="h-full w-full bg-neutral-800">
      {videoModalVisible && (
        <VideoUploadModal
          setVideoModalVisible={setVideoModalVisible}
          setVideo={setVideo}
        />
      )}
      {addProductModalVisible && (
        <AddProductModal
          setAddProductModalVisible={setAddProductModalVisible}
          setProduct={setProduct}
        />
      )}
      {videoPlayerModalVisible && (
        <VideoPlayerModal
          setVideoPlayerModalVisible={setVideoPlayerModalVisible}
          video={video}
        />
      )}
      <fieldset
        className={
          text || product || video
            ? "h-[60%] w-full bg-neutral-700 rounded-r-md p-2 transition-all"
            : "h-[15%] w-full bg-neutral-700 rounded-r-md p-2 transition-all"
        }
      >
        <form className="h-full w-full relative flex">
          <div className="h-full w-[6%] pr-2 pl-2 ">
            <img
              className={
                text || product || video
                  ? "h-[15%] object-cover w-full rounded-full transition-all"
                  : "h-[70%] object-cover w-full rounded-full transition-all"
              }
              src={user && user.profilePicture}
            ></img>
          </div>
          <div className="w-[86%] h-full relative flexend ">
            <input
              onChange={(e) => setText(e.target.value)}
              className={
                text || product || video
                  ? "w-full bg-neutral-900 rounded-md p-4 text-xl text-white h-[90%] z-20"
                  : "w-full bg-neutral-900 rounded-md p-4 text-xl text-white h-[75%] z-20"
              }
              placeholder="Write something in here..."
            ></input>
            <div className="flex h-full gap-2 relative ">
              {product && (
                <>
                  {" "}
                  <article
                    className={
                      "w-full h-[35%] bg-neutral-800   grid grid-cols-3 absolute top-2 rounded-md "
                    }
                  >
                    <button
                      className="absolute h-full w-[3%] right-0 top-0 flex items-center"
                      onClick={(e) => {
                        e.preventDefault(e);
                        setProduct(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-8 h-8 hover:text-orange-500 text-neutral-900 transition-all"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="overflow-hidden flex items-center justify-center border-r-2 border-neutral-900 border-opacity-20">
                      <img
                        className="h-[80%] w-[80%] object-cover rounded-md"
                        src={product.productPicture[0]}
                      ></img>
                    </div>
                    <div className="p-4  border-r-2 border-neutral-900 border-opacity-20">
                      <h1 className="text-xl text-neutral-400">
                        {product.productName}
                      </h1>
                      <h3 className="text-neutral-400 text-sm">
                        {product.productDescription}
                      </h3>
                    </div>
                    <div className="flex items-center justify-center">
                      <h1 className="text-neutral-400 text-3xl">
                        {product.productNewPrice}$
                      </h1>
                    </div>
                  </article>
                </>
              )}
              {video && (
                <div
                  className={
                    product
                      ? " h-[40%] w-full absolute top-[40%] rounded-md"
                      : " h-[40%] w-full absolute top-2 rounded-md"
                  }
                >
                  <button
                    className="absolute h-full w-[3%] right-0 top-0 flex items-center z-50"
                    onClick={(e) => {
                      e.preventDefault(e);
                      setVideo(null);
                    }}
                  ></button>
                  <video
                    src={video}
                    className="h-full w-full object-cover rounded-md"
                  ></video>
                  <div className="absolute top-0 h-full w-full bg-neutral-900 bg-opacity-40 flex items-center justify-center rounded-md">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setVideoPlayerModalVisible(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-10 h-10 text-neutral-400 hover:text-white transition-all"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setVideoModalVisible(true);
                }}
                className=" bg-neutral-900 text-white h-[40px] w-[8%] flex items-center justify-center rounded-md rounded-b-md hover:bg-orange-500 transition-all self-end"
              >
                Add video
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault(e);
                  setAddProductModalVisible(true);
                }}
                className=" bg-neutral-900 text-white h-[40px] w-[8%] flex items-center justify-center rounded-md rounded-b-md hover:bg-orange-500 transition-all  self-end"
              >
                Add product
              </button>
            </div>
          </div>

          <button className="absolute bottom-0 right-0 w-[8%]  bg-neutral-900 text-white h-[40px] flex items-center justify-center rounded-l-md rounded-b-md hover:bg-orange-500 transition-all">
            Post
          </button>
        </form>
      </fieldset>
    </section>
  );
};

export default YourFeed;
