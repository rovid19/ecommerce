import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoUploadModal from "./VideoUploadModal";
import AddProductModal from "./AddProductModal";
import VideoPlayerModal from "./VideoPlayerModal";
import Post from "./Post";
import PostModal from "./PostModal";
import axios from "axios";
import Loader from "../../assets/svg-loaders/three-dots.svg";
import { setActive } from "../../app/features/triggeri";

const YourFeed = () => {
  const [text, setText] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [videoPlayerModalVisible, setVideoPlayerModalVisible] = useState(false);
  const [feedPosts, setFeedPosts] = useState(null);
  const [postTrigger, setPostTrigger] = useState(false);
  const [comIndex, setComIndex] = useState(null);
  const [comPostDelete, setComPostDelete] = useState(null);
  const [youtubeId, setYoutubeId] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [videoModalClass, setVideoModalClass] = useState(
    "h-[80%] md:h-[70%] lg:w-[70%] w-full  md:w-[80%] bg-neutral-900 fl2 relative rounded-md p-4"
  );

  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [index, setIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [likeTrigger, setLikeTrigger] = useState(false);

  const textA = useRef();
  const feedContainer = useRef(null);
  const postModalVisible = useSelector(
    (state) => state.post.value.postModalVisible
  );
  const active = useSelector((state) => state.triggeri.value.active);
  const user = useSelector((state) => state.userData.value.user);
  const products = useSelector((state) => state.userData.value.products);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  async function handlePostUpload(e) {
    e.preventDefault();
    if (!text && !video && !product) {
      alert("You cant post empty post");
    } else {
      await axios.post("/api/customer/post-upload", {
        text,
        videoForm: video ? video : "",
        youtubeForm: youtubeId ? youtubeId : "",
        product,
        userId: user._id,
        date: formattedDate,
      });
      setText(null);
      setVideo(null);
      setProduct(null);
      setYoutubeId(null);
      setPostTrigger(!postTrigger);
      textA.current.value = "";
    }
  }

  useEffect(() => {
    setFeedPosts(null);
    setIsLoading(true);

    if (comPostDelete === "Delete") {
      setComIndex(deleteIndex);
    }

    if (active === "Following") {
      axios
        .post("/api/customer/get-followings-post", { userId: user._id })
        .then(({ data }) => {
          setFeedPosts(data.reverse());
          setIsLoading(false);
          if (comPostDelete === "Post") {
            if (data[index].postComments.length === 0) {
              setComIndex(data[index].postComments.length);
            } else {
              setComIndex(data[index].postComments.length - 1);
            }
          }
        });
    } else if (active === "Trending") {
      axios.get("/api/customer/get-all-posts").then(({ data }) => {
        let reverseArray = data.reverse();
        setFeedPosts(reverseArray);
        setIsLoading(false);

        if (comPostDelete === "Post") {
          if (data[index].postComments.length === 0) {
            setComIndex(data[index].postComments.length);
          } else {
            setComIndex(data[index].postComments.length - 1);
          }
        }
      });
    }
  }, [postTrigger, active]);
  console.log(active);
  return (
    <section
      className="h-full w-full bg-neutral-800 overflow-scroll scrollbar-hide "
      ref={feedContainer}
    >
      {user && Object.keys(user).length > 0 ? (
        ""
      ) : (
        <div
          className={
            "absolute top-0 right-0 lg:top-0 lg:left-[92%] lg:w-[8%] w-[45px] h-[50px]  z-30 lg:rounded-l-md"
          }
        >
          <select
            className={
              active === "Your Feed"
                ? "h-full w-full text-center bg-neutral-700 text-white rounded-l-md"
                : "h-full w-full text-center bg-neutral-900 text-white rounded-l-md"
            }
            value="Your Feed"
            onChange={(e) => dispatch(setActive(e.target.value))}
          >
            <option className="text-sm text-center">
              {user && Object.keys(user).length > 0
                ? "Your Feed"
                : "Trending Feed"}
            </option>
            <option className="text-sm text-center">Home</option>
          </select>
        </div>
      )}
      {videoModalVisible && (
        <VideoUploadModal
          setVideoModalVisible={setVideoModalVisible}
          setVideo={setVideo}
          setYoutubeId={setYoutubeId}
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
          videoModalClass={videoModalClass}
          setVideoModalClass={setVideoModalClass}
          youtubeId={youtubeId}
        />
      )}
      {feedPosts && feedPosts[index] && postModalVisible && (
        <PostModal
          feedPosts={feedPosts}
          index={index}
          setPostTrigger={setPostTrigger}
          postTrigger={postTrigger}
          comIndex={comIndex}
          setComIndex={setComIndex}
          comPostDelete={comPostDelete}
          setComPostDelete={setComPostDelete}
          setDeleteIndex={setDeleteIndex}
        />
      )}
      {user && Object.keys(user).length > 0 && (
        <fieldset
          className={
            text || product || video
              ? "h-[50%] lg:h-[60%] w-full bg-neutral-700 rounded-r-md p-2 transition-all relative"
              : "h-[15%] w-full bg-neutral-700 rounded-r-md p-1 lg:p-2 transition-all relative"
          }
        >
          {active === "Home" ? (
            ""
          ) : (
            <div
              className={
                "absolute bottom-0 left-0 lg:top-0 lg:left-[92%] lg:w-[8%] w-[45px] h-[50px]  z-30 lg:rounded-l-md"
              }
            >
              <select
                className={
                  active === "Following"
                    ? "h-full w-full text-center bg-neutral-700 text-white rounded-l-md"
                    : "h-full w-full text-center bg-neutral-900 text-white rounded-l-md"
                }
                onChange={(e) => dispatch(setActive(e.target.value))}
              >
                <option value="Following" className="text-sm text-center">
                  Following
                </option>
                <option value="Trending" className="text-sm text-center">
                  Trending
                </option>
                <option value="Home" className="text-sm text-center">
                  Home
                </option>
              </select>
            </div>
          )}
          <form
            className="h-full w-full relative flex"
            onSubmit={handlePostUpload}
          >
            <div className="h-full lg:w-[6%] w-[50px] pr-2 pl-2 ">
              <img
                className={
                  text || product || video
                    ? "lg:h-[15%] h-0 object-cover w-0 lg:w-full rounded-full transition-all"
                    : "lg:h-[70%] h-0 w-0 object-cover lg:w-full rounded-full transition-all"
                }
                src={user && user.profilePicture}
              ></img>
            </div>
            <div className="w-full lg:w-[86%] h-full relative flexend ">
              <textarea
                ref={textA}
                onChange={(e) => setText(e.target.value)}
                className={
                  text || product || video
                    ? "w-full bg-neutral-900 rounded-md p-4 text-xl text-white h-[90%] z-20 align-top placeholder:text-base md:placeholder:text-xl"
                    : "w-full bg-neutral-900 rounded-md p-4 text-xl text-white h-[75%] z-20 align-top placeholder:text-base md:placeholder:text-xl "
                }
                placeholder="Write something in here..."
              ></textarea>
              <div className="flex h-full gap-2 relative  ">
                {product && (
                  <>
                    {" "}
                    <article
                      className={
                        "w-full h-[35%] bg-neutral-800   grid grid-cols-3 absolute top-2 rounded-md "
                      }
                    >
                      <button
                        className="absolute h-full w-[8%] lg:w-[5%] 2xl:w-[3%] md:w-[6%] right-0 top-0 flex items-center"
                        onClick={(e) => {
                          e.preventDefault(e);
                          setProduct(null);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="lg:w-8 lg:h-8 w-6 h-6 hover:text-orange-500 lg:text-neutral-400 transition-all text-orange-500"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="overflow-hidden flex items-center justify-center border-r-2 border-neutral-900 border-opacity-20  ">
                        <img
                          className="h-[80%] w-[80%] object-cover rounded-md"
                          src={product.productPicture[0]}
                        ></img>
                      </div>
                      <div className="  border-r-2 border-neutral-900 border-opacity-20 h-full lg:p-4 p-1 ">
                        <h1 className="text-xl text-neutral-400">
                          {product.productName}
                        </h1>
                        <h3 className="text-neutral-400 text-sm">
                          {product.productDescription}
                        </h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="text-neutral-400 text-xl lg:text-3xl">
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
                        ? " h-[30%] md:h-[40%] w-full absolute top-[42%] md:top-[40%] rounded-md"
                        : " h-[30%] md:h-[40%] w-full absolute top-2 rounded-md"
                    }
                  >
                    <button
                      className="absolute h-full w-[8%] lg:w-[5%] 2xl:w-[3%] md:w-[6%] right-0 top-0 flex items-center z-50"
                      onClick={(e) => {
                        e.preventDefault(e);
                        setVideo(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="lg:w-8 lg:h-8 w-6 h-6 hover:text-orange-500 lg:text-neutral-400 transition-all text-orange-500"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <video
                      src={video}
                      className="h-full w-full object-cover rounded-md"
                    ></video>
                    <div className="absolute top-0 h-full w-full bg-neutral-900 bg-opacity-40 z-40 flex items-center justify-center rounded-md">
                      <button
                        onClick={(e) => {
                          setVideoModalClass((prev) => prev + " postModalOpen");
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
                {youtubeId && (
                  <div
                    className={
                      product
                        ? " h-[30%] md:h-[40%] w-full absolute top-[42%] md:top-[40%] rounded-md"
                        : " h-[30%] md:h-[40%] w-full absolute top-2 rounded-md"
                    }
                  >
                    <button
                      className="absolute h-full w-[8%] lg:w-[5%] 2xl:w-[3%] md:w-[6%] right-0 top-0 flex items-center z-50"
                      onClick={(e) => {
                        e.preventDefault(e);
                        setYoutubeId(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="lg:w-8 lg:h-8 w-6 h-6 hover:text-orange-500 lg:text-neutral-400 transition-all text-orange-500"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <iframe src={youtubeId} className="h-full w-full"></iframe>
                    <div className="absolute top-0 h-full w-full bg-neutral-900 bg-opacity-40 z-40 flex items-center justify-center rounded-md">
                      <button
                        onClick={(e) => {
                          setVideoModalClass((prev) => prev + " postModalOpen");
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
                  className=" bg-neutral-900 text-white lg:text-base text-sm h-[40px] lg:w-[10%] xl:w-[8%] w-[25%] flex items-center justify-center rounded-md rounded-b-md hover:bg-orange-500 transition-all self-end"
                >
                  Add video
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault(e);
                    setAddProductModalVisible(true);
                  }}
                  className=" bg-neutral-900 lg:text-base text-sm text-white h-[40px] lg:w-[10%] xl:w-[8%] w-[25%] flex items-center justify-center rounded-md rounded-b-md hover:bg-orange-500 transition-all  self-end"
                >
                  Add product
                </button>
              </div>
            </div>

            <button className="absolute lg:text-base text-sm bottom-0 right-0 w-[20%] lg:w-[8%] h-[40px]  bg-orange-500 lg:bg-neutral-900 text-white lg:h-[40px] flex items-center justify-center rounded-md lg:rounded-l-md rounded-b-md hover:bg-orange-500 transition-all">
              Post
            </button>
          </form>
        </fieldset>
      )}
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <img src={Loader}></img>
        </div>
      ) : (
        <div className=" w-full flex justify-center bg-neutral-800">
          <div className="h-full lg:w-[60%] w-[90%] bg-neutral-800">
            {feedPosts &&
              feedPosts.map((post, i) => {
                return (
                  <Post
                    post={post}
                    setIndex={setIndex}
                    index={i}
                    setPostTrigger={setPostTrigger}
                    postTrigger={postTrigger}
                  />
                );
              })}{" "}
          </div>
        </div>
      )}
    </section>
  );
};

export default YourFeed;
