import React from "react";
import { useSelector } from "react-redux";

const YourFeed = () => {
  const user = useSelector((state) => state.userData.value.user);
  return (
    <section className="h-full w-full bg-neutral-800">
      <fieldset className="h-[15%] w-full bg-neutral-700 rounded-r-md p-2">
        <form className="h-full w-full relative flex">
          <div className="h-full w-[6%] p-4 ">
            <img
              className="h-[70%] object-cover w-full rounded-full "
              src={user.profilePicture}
            ></img>
          </div>
          <div className="w-[86%] h-full relative flexend">
            <input
              className="w-[86%] bg-neutral-700 p-4 text-xl text-white h-[75%]"
              placeholder="Write something in here..."
            ></input>
            <button>Add video</button>
            <button>Add product</button>
          </div>

          <button className="absolute bottom-0 right-0 w-[8%]  bg-black text-white h-[25%] flex items-center justify-center rounded-l-md rounded-b-md hover:bg-orange-500 transition-all">
            Post
          </button>
        </form>
      </fieldset>
    </section>
  );
};

export default YourFeed;
