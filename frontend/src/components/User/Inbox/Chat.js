import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUserData } from "../../../app/features/User/userSlice";
import { switchValue } from "../../../app/features/getUserTrigger";
import {
  setFetchUserTrigger,
  setInboxTrigger,
  setRunUseEffect,
} from "../../../app/features/triggeri";

const Chat = ({
  chat,
  setChatVisible,
  index,
  fetchMessagesTrigger,
  setFetchMessagesTrigger,
  seenTrigger,
  setSeenTrigger,
}) => {
  const user = useSelector((state) => state.userData.value.user);
  const sectionRef = useRef();
  const inboxTrigger = useSelector(
    (state) => state.triggeri.value.inboxTrigger
  );
  const runUseEffect = useSelector(
    (state) => state.triggeri.value.runUseEffect
  );
  const fetchUserTrigger = useSelector(
    (state) => state.triggeri.value.fetchUserTrigger
  );

  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const dispatch = useDispatch();
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

  //seen poruke kad ti neko posalje poruku, a ti si u tom trenutku u chatu
  console.log(chat);
  return (
    <section className="h-full w-full relative flexend">
      {chat[index].messages.map((message, i) => {
        if (message.id === user._id) {
          return (
            <article
              className={
                i === 0
                  ? "self-start text-xl max-w-[30%] min-w-[20%] break-words  bg-orange-500 text-white p-4 rounded-r-md flex-col group relative inline-flex"
                  : "self-start max-w-[30%] break-words  bg-orange-500 text-white p-4 rounded-r-md flex-col group mt-4 relative inline-flex"
              }
            >
              <div className="h-full w-[50px] flex justify-center absolute left-0 top-0">
                <img
                  src={user.profilePicture}
                  className="h-[50px] w-[90%] rounded-full mt-2 object-cover"
                ></img>
              </div>
              <div className="h-full w-[85%] ml-12">
                {" "}
                <p>{message.messages}</p>
              </div>
              <div className="absolute top-0 right-[-50%] h-full w-[50%] z-20 bg-neutral-900 invisible group-hover:visible rounded-r-md fl2 text-sm">
                <p>{message.date}</p> <p>{message.time}</p>
              </div>
            </article>
          );
        } else {
          return (
            <article
              className={
                i === 0
                  ? "h-auto  w-auto text-xl max-w-[40%] min-w-[20%] break-words  bg-neutral-900 text-white p-4 rounded-l-md flex group relative self-end"
                  : "h-auto w-auto text-xl max-w-[40%] min-w-[20%] break-words  bg-neutral-900 text-white p-4 rounded-l-md flex group mt-2 relative self-end"
              }
            >
              <div className="h-full w-[50px] flex justify-center absolute right-2 top-2">
                <img
                  src={user.profilePicture}
                  className="h-[50px] w-[90%] rounded-full mt-2 object-cover"
                ></img>
              </div>
              <div className="h-full w-[85%] mr-12 flex justify-end">
                {" "}
                <p>{message.messages}</p>
              </div>
              <div className="absolute top-0 right-[-50%] h-full w-[50%] z-20 bg-neutral-900 invisible group-hover:visible rounded-r-md fl2 text-sm">
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
