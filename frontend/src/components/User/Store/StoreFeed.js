import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../../Homepage/Post.js";
import PostModal from "../../Homepage/PostModal.js";
import Loader from "../../../assets/svg-loaders/three-dots.svg";
import { useSelector } from "react-redux";

const StoreFeed = ({ storeUser }) => {
  const [userPosts, setUserPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(null);
  const [postTrigger, setPostTrigger] = useState(false);

  const postModalVisible = useSelector(
    (state) => state.post.value.postModalVisible
  );
  useEffect(() => {
    getAllPostsFromUser();
  }, [postTrigger]);

  const getAllPostsFromUser = async () => {
    if (!userPosts) {
      setIsLoading(true);
    }

    const response = await axios.post("/api/customer/get-user-posts", {
      userId: storeUser._id,
    });
    setUserPosts(response.data.reverse());
    setIsLoading(false);
  };

  return (
    <div className=" w-full flex justify-center bg-neutral-800 ">
      {isLoading && (
        <div className="h-[50vh] w-full flex items-center justify-center  absolute top-[50%] left-0 z-50 bg-neutral-800 ">
          <img src={Loader}></img>{" "}
        </div>
      )}
      {postModalVisible && (
        <PostModal
          feedPosts={userPosts}
          index={index}
          postTrigger={postTrigger}
          setPostTrigger={setPostTrigger}
        />
      )}
      <div className="h-full w-[90%] md:w-[80%]">
        {userPosts &&
          userPosts.map((post, i) => (
            <div className="">
              <Post
                post={post}
                setIndex={setIndex}
                index={i}
                postTrigger={postTrigger}
                setPostTrigger={setPostTrigger}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoreFeed;
