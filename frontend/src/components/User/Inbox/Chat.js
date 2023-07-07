import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../app/features/User/userSlice";

const Chat = ({ chat, setChatVisible, index }) => {
  const user = useSelector((state) => state.userData.value.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .post("/api/customer/seen-message", {
        chatId: chat[index]._id,
        userId: user._id,
      })
      .then(() => dispatch(fetchUserData()));
  }, []);
  console.log(chat[index]);
  return (
    <section className="h-full w-full">
      {chat[index].messages.map((message) => {
        if (message.id === user._id) {
          return (
            <article className="h-[10%] w-full relative flex  flex-wrap ">
              <div className="h-auto w-auto text-xl max-w-[50%] break-words absolute left-0  bg-orange-500 text-white p-4 rounded-r-md ">
                <p>{message.messages}</p>
              </div>
            </article>
          );
        } else {
          return (
            <article className="h-[10%] w-full relative flex  flex-wrap  ">
              <div className="h-auto w-auto text-xl max-w-[50%] break-words absolute right-0  bg-neutral-900 text-white p-4 rounded-r-md ">
                <p>{message.messages}</p>
              </div>
            </article>
          );
        }
      })}
    </section>
  );
};

export default Chat;
