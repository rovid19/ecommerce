import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ManageFollowers = ({ setManageFollowersVisible }) => {
  const [activeSelect, setActiveSelect] = useState("Followers");
  const [follow, setFollow] = useState(null);
  const [removeTrigger, setRemoveTrigger] = useState(false);
  const [removeFollower, setRemoveFollower] = useState(null);
  const user = useSelector((state) => state.userData.value.user);

  useEffect(() => {
    axios
      .post("/api/store/get-follow", { userId: user._id })
      .then(({ data }) => {
        setFollow(data);
      });
  }, [removeTrigger]);

  const handleRemoveFollower = async () => {
    await axios.post("/api/store/remove-follower", {
      removeFollower,
      select: activeSelect,
    });
    setRemoveTrigger(!removeTrigger);
  };

  const handleRemoveFollowing = async () => {
    await axios.post("/api/store/remove-follower", {
      removeFollower,
      select: activeSelect,
    });
    setRemoveTrigger(!removeTrigger);
  };

  useEffect(() => {
    if (removeFollower) {
      if (activeSelect === "Followers") {
        handleRemoveFollower();
      } else {
        handleRemoveFollowing();
      }
    }
  }, [removeFollower]);
  return (
    <div className="absolute top-0 h-full w-full bg-neutral-900 bg-opacity-40 z-50 flex justify-center items-center">
      <article className="h-[60%] w-[50%] bg-neutral-900 fl2 relative rounded-md p-4">
        <button
          className="absolute top-2 left-2 z-50"
          onClick={() => setManageFollowersVisible(false)}
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

        <div className=" w-[80%] h-[90%] fl2">
          <select
            className="text-center w-[30%] h-[10%] rounded-md text-white bg-neutral-800"
            onChange={(e) => setActiveSelect(e.target.value)}
          >
            <option>Followers</option>
            <option>Followings</option>
          </select>
          <div className="h-[90%] w-full mt-4">
            {activeSelect === "Followers"
              ? follow &&
                follow.followers.map((follower) => {
                  return (
                    <article className="w-full h-[20%]  mt-2 rounded-r-md rounded-l-md flex">
                      <div className="h-full w-[20%] bg-neutral-800 rounded-l-md p-2 flex justify-center items-center">
                        {" "}
                        <img
                          className="h-full rounded-full w-[60%] object-cover"
                          src={follower.profilePicture}
                        ></img>
                      </div>
                      <div className="h-full w-[60%] bg-neutral-800 p-2 pt-4">
                        <h1 className="text-xl text-neutral-300">
                          {follower.username}
                        </h1>
                      </div>
                      <div className="h-full w-[20%] bg-neutral-800 rounded-r-md ">
                        <button
                          className="h-full w-full bg-neutral-700 text-neutral-400 rounded-r-md hover:bg-orange-500 hover:text-white "
                          onClick={() => setRemoveFollower(follower._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  );
                })
              : follow &&
                follow.followings.map((following) => {
                  return (
                    <article className="w-full h-[20%]  mt-2 rounded-r-md rounded-l-md flex">
                      <div className="h-full w-[20%] bg-neutral-800 rounded-l-md p-2 flex justify-center items-center">
                        {" "}
                        <img
                          className="h-full rounded-full w-[60%] object-cover"
                          src={following.profilePicture}
                        ></img>
                      </div>
                      <div className="h-full w-[60%] bg-neutral-800 p-2 pt-4">
                        <h1 className="text-xl text-neutral-300">
                          {following.username}
                        </h1>
                      </div>
                      <div className="h-full w-[20%] bg-neutral-800 rounded-r-md ">
                        <button
                          className="h-full w-full bg-neutral-700 text-neutral-400 rounded-r-md hover:bg-orange-500 hover:text-white "
                          onClick={() => setRemoveFollower(following._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  );
                })}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ManageFollowers;
