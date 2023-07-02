import React from "react";
import { useSelector } from "react-redux";

const Chat = ({ chat, setChatVisible, index }) => {
  const user = useSelector((state) => state.userData.value.user);

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
            <article className="h-[10%] w-full relative flex  flex-wrap ">
              <div className="h-auto w-auto text-xl max-w-[50%] break-words absolute left-0  bg-orange-500 text-white p-4 rounded-r-md ">
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
