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
    setUserPosts(response.data);
    setIsLoading(false);
  };
  console.log(index);
  return (
    <div className=" w-full flex justify-center bg-neutral-800 ">
      {isLoading && (
        <div className="h-[50vh] w-full flex items-center justify-center ">
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
      <div className="h-full w-[80%]">
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
