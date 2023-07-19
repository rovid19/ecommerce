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

  return (
    <section className="h-full w-full relative">
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
      <div ref={sectionRef} />
    </section>
  );
};

export default Chat;
