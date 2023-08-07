import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  setPostModalClass,
  setPostModalClose,
  setPostModalReset,
  setPostModalVisible,
} from "../../app/features/post";

const PostModal = ({
  feedPosts,
  index,
  setPostTrigger,
  postTrigger,
  comIndex,
  setComIndex,
  setDeleteIndex,
  comPostDelete,
  setComPostDelete,
}) => {
  const [commentText, setCommentText] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showLess, setShowLess] = useState(true);
  const [commentId, setCommentId] = useState(null);
  const [commentAni, setCommentAni] = useState(" mt-4 flex ");
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textRef = useRef();
  const storeSubPage = useSelector((state) => state.storeSubPage.value);
  const postModalClass = useSelector(
    (state) => state.post.value.postModalClass
  );
  useEffect(() => {
    const isLiked = feedPosts[index].postLikes.includes(user._id);
    setLiked(isLiked);
    // setLikeTrigger(false);
  }, [feedPosts[index]]);

  const handleDeleteComment = async () => {
    await axios.post("/api/customer/delete-comment", { commentId });
    setComPostDelete("Delete");
    setCommentAni(" mt-4 flex ");
    setPostTrigger(!postTrigger);
  };
  useEffect(() => {
    if (commentId) {
      handleDeleteComment();
    }
  }, [commentId]);

  async function likePost() {
    await axios.post("/api/customer/like-post", {
      postId: feedPosts[index]._id,
      userId: user._id,
    });
    setPostTrigger(!postTrigger);
  }
  async function unlikePost() {
    await axios.post("/api/customer/unlike-post", {
      postId: feedPosts[index]._id,
      userId: user._id,
    });
    setPostTrigger(!postTrigger);
  }

  const sumbitComment = async (e) => {
    e.preventDefault();
    await axios.post("/api/customer/post-comment", {
      userId: user._id,
      comment: commentText,
      postId: feedPosts[index]._id,
    });
    setComPostDelete("Post");
    setCommentAni(" mt-4 flex ");
    setPostTrigger(!postTrigger);
    textRef.current.value = "";
  };
  const user = useSelector((state) => state.userData.value.user);

  useEffect(() => {
    if (comIndex >= 0) {
      if (comPostDelete === "Post") {
        setCommentAni((prev) => prev + " commentAniPost");
        setTimeout(() => {
          setCommentAni(" mt-4 flex ");
          setComIndex(undefined);
        }, [400]);
      } else {
        setCommentAni((prev) => prev + " commentAniDelete");
        setTimeout(() => {
          setCommentAni(" mt-4 flex ");
          setComIndex(undefined);
        }, [600]);
      }
    }
  }, [comIndex]);

  return (
    <div
      className={
        storeSubPage === "store"
          ? "absolute top-0 h-[100%] w-full bg-neutral-900 bg-opacity-60 z-40 flex justify-center items-center"
          : "absolute h-[100%] w-full bg-neutral-900 bg-opacity-60 z-40 flex justify-center items-center"
      }
    >
      {" "}
      <article className={postModalClass}>
        <button
          className="absolute lg:top-2 lg:left-2 z-50 top-2 right-2"
          onClick={() => {
            dispatch(
              setPostModalClass(
                postModalClass.replace("postModalOpen", "postModalClose")
              )
            );

            setTimeout(() => {
              dispatch(
                setPostModalClass(postModalClass.replace("postModalClose", ""))
              );
              dispatch(setPostModalVisible(false));
            }, [300]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 text-orange-500 hover:text-orange-800 transition-all"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div className=" w-full">
          <div className="h-full w-full flex gap-2 lg:gap-0 ">
            <div className="w-[10%] md:w-[8%] lg:p-4 xl:w-[5%] h-full p-1 flex justify-center">
              <img
                onClick={() =>
                  navigate(
                    `/store/${feedPosts[index].postAuthor.username}/${feedPosts[index].postAuthor.store._id}`
                  )
                }
                src={feedPosts[index].postAuthor.profilePicture}
                className="h-[50px] w-full rounded-full object-cover cursor-pointer"
              ></img>
            </div>
            <div className="w-[80%] h-full lg:pt-2 text-neutral-400">
              <h1
                className="text-xl cursor-pointer hover:text-white "
                onClick={() =>
                  navigate(
                    `/store/${feedPosts[index].postAuthor.username}/${feedPosts[index].postAuthor.store._id}`
                  )
                }
              >
                {feedPosts[index].postAuthor.username}
              </h1>
              <h3 className="text-sm">{feedPosts[index].postDate}</h3>
            </div>
          </div>
          <p className="text-neutral-300 p-4">{feedPosts[index].postText}</p>
        </div>
        <div className="h-[450px] w-ful relative">
          {" "}
          {feedPosts[index].postVideo ? (
            <>
              <video
                src={feedPosts[index].postVideo}
                className="h-full w-full object-cover rounded-md"
                controls
              ></video>
            </>
          ) : (
            <img
              src={feedPosts[index].postProduct.productPicture[0]}
              className="h-full w-full object-cover rounded-md"
            ></img>
          )}
        </div>
        <div className="h-[10%] w-full p-2 border-b-2 border-neutral-700  border-opacity-25">
          <div className="h-[50%] border-b-2 border-neutral-900 border-opacity-25 grid grid-cols-2 text-neutral-500">
            <div className="h-full flex items-center justify-center">
              <h1>{feedPosts[index].postLikes.length} likes</h1>
            </div>
            <div className="h-full flex items-center justify-center ">
              <h1>{feedPosts[index].postComments.length} comments</h1>
            </div>
          </div>
          <div className="h-[50%] flex p-2">
            <button
              className={
                liked
                  ? "w-[50%] h-full flex items-center justify-center gap-2 text-orange-500 hover:text-neutral-300 transition-all"
                  : "w-[50%] h-full flex items-center justify-center gap-2 text-neutral-300 hover:text-orange-500 transition-all"
              }
              onClick={() => {
                if (liked) {
                  unlikePost();
                } else {
                  likePost();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
              </svg>
              {liked ? "unlike" : "like"}
            </button>
            <button className="w-[50%] h-full flex items-center justify-center gap-2 text-neutral-300 hover:text-orange-500 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                  clip-rule="evenodd"
                />
              </svg>
              Comment
            </button>
          </div>
        </div>
        <div
          className={
            showLess
              ? "h-[30%] w-full  relative overflow-hidden transition-all"
              : "h-[30%] w-full  relative transition-all"
          }
        >
          <h1 className="text-neutral-600 p-2 text-base">
            {feedPosts[index].postComments.length} Comments:
          </h1>
          <button
            className="absolute top-2 right-2 text-neutral-600 hover:text-orange-500 "
            onClick={() => setShowLess(!showLess)}
          >
            {showLess ? "Show more comments" : "Show less"}
          </button>
          <div className={showLess ? "h-full w-full  p-2" : "w-full  p-2"}>
            {feedPosts[index].postComments.map((comment, i) => {
              return (
                <article
                  className={comIndex === i ? commentAni : " mt-4 flex "}
                >
                  <div className="h-[80px] md:w-[60px] lg:w-[6%] xl:w-[50px] w-[10%]  p-3 flex justify-center  ">
                    <img
                      src={comment.commentAuthor.profilePicture}
                      className="rounded-full h-[60%] w-full md:w-[80%] object-cover lg:w-full"
                    ></img>
                  </div>
                  <div className=" w-auto bg-neutral-800 text-neutral-300 p-4 max-w-[80%] break-words rounded-lg relative">
                    {comment.commentText}
                    <button
                      className="absolute bottom-1 right-1"
                      onClick={() => {
                        setDeleteIndex(i);
                        setCommentId(comment._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4 text-neutral-600 hover:text-orange-500 "
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <form
            className={
              showLess
                ? "h-[40%] flex p-2 absolute bottom-0 w-full bg-neutral-900"
                : "h-[40%] flex p-2  relative "
            }
            onSubmit={sumbitComment}
          >
            <div className="lg:w-[6%] md:w-[60px] xl:w-[50px] w-[10%] md:[4%]   p-1 pr-2 ">
              <img
                className="h-[70%] w-full  rounded-full object-cover "
                src={user.profilePicture}
              ></img>
            </div>
            <textarea
              ref={textRef}
              placeholder="Type in your comment..."
              className="h-full w-[90%] lg:[94%] xl:w-[96%] md:w-[94%] align-top p-2 bg-neutral-800 text-white outline-none rounded-md"
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="absolute bottom-4 right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8 text-neutral-500 hover:text-white transition-all "
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </form>
        </div>
      </article>
    </div>
  );
};

export default PostModal;
