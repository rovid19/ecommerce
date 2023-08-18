import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../app/features/User/userSlice";
import { setRunUseEffect } from "../../../app/features/triggeri";

const Chat = ({
  chat,
  index,
  fetchMessagesTrigger,
  setFetchMessagesTrigger,
  seenTrigger,
}) => {
  // REDUX
  const user = useSelector((state) => state.userData.value.user);
  const sectionRef = useRef();

  // OTHER
  const dispatch = useDispatch();

  // USEEFFECTS
  useEffect(() => {
    async function fetch() {
      await axios.post("/api/customer/seen-message", {
        chatId: chat[index]._id,
        userId: user._id,
      });
      await dispatch(fetchUserData()).unwrap();
      setFetchMessagesTrigger(!fetchMessagesTrigger);

      dispatch(setRunUseEffect(true));
    }
    fetch();
  }, [seenTrigger]);

  useEffect(() => {
    setTimeout(() => {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }, [1100]);
  }, [fetchMessagesTrigger]);

  return (
    <section className="h-full w-full relative flexend">
      {chat[index].messages.map((message, i) => {
        if (message.id === user._id) {
          return (
            <article
              className={
                i === 0
                  ? "self-start max-w-[50%]  text-xl lg:max-w-[30%] min-w-[20%] break-words  bg-orange-500 text-white p-4 rounded-r-md flex-col group relative inline-flex"
                  : "self-start max-w-[50%]  lg:max-w-[30%] break-words  bg-orange-500 text-white p-4 rounded-r-md flex-col group mt-4 relative inline-flex"
              }
            >
              <div className="h-full w-[30px] lg:w-[50px] flex justify-center absolute left-0 top-0">
                <img
                  src={user.profilePicture}
                  className="h-[40px] w-[80%] rounded-full mt-2 object-cover"
                ></img>
              </div>
              <div className="h-full w-[85%] ml-4 lg:ml-12">
                {" "}
                <p>{message.messages}</p>
              </div>
              <div className="absolute top-0 right-[-100px] h-[50px] w-[100px] z-20 bg-neutral-900 invisible group-hover:visible rounded-r-md fl2 text-sm">
                <p>{message.date}</p> <p>{message.time}</p>
              </div>
            </article>
          );
        } else {
          return (
            <article
              className={
                i === 0
                  ? "self-end max-w-[50%]  text-xl lg:max-w-[30%] min-w-[20%] break-words  bg-neutral-900 text-white p-4 rounded-l-md flex-col group relative inline-flex"
                  : "self-end max-w-[50%]  lg:max-w-[30%] break-words  bg-neutral-900 text-white p-4 rounded-l-md flex-col group mt-4 relative inline-flex"
              }
            >
              <div className="h-full w-[30px] lg:w-[50px] flex justify-center absolute right-0 top-0">
                <img
                  src={user.profilePicture}
                  className="h-[40px] w-[80%] rounded-full mt-2 object-cover"
                ></img>
              </div>
              <div className="h-full w-[85%] mr-4 lg:mr-12">
                {" "}
                <p>{message.messages}</p>
              </div>
              <div className="absolute top-0 left-[-100px] h-[50px] w-[100px] z-20 bg-neutral-900 invisible group-hover:visible rounded-r-md fl2 text-sm">
                <p>{message.date}</p> <p>{message.time}</p>
              </div>
            </article>
          );
        }
      })}

      <div ref={sectionRef} />
    </section>
  );
};

export default Chat;
