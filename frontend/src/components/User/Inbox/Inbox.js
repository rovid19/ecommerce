import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SendMessage from "./SendMessage";
import Chat from "./Chat";
import { useSelector } from "react-redux";

const Inbox = () => {
  const [allChat, setAllChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(false);
  const [fetchMessagesTrigger, setFetchMessagesTrigger] = useState(false);
  const [chat, setChat] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [index, setIndex] = useState(null);
  const [textMessage, setTextMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState(null);

  const user = useSelector((state) => state.userData.value.user);
  const inputRef = useRef();

  // ucitaj sve chatove korisnika
  useEffect(() => {
    axios.get("/api/customer/get-chat").then(({ data }) => {
      setAllChat(data);
    });
  }, [fetchMessagesTrigger]);

  //posalji poruku
  async function handleSendMessage(e) {
    e.preventDefault();
    await axios.post("/api/customer/send-message", {
      senderId: user._id,
      receiverId: selectedUser,
      message: textMessage,
      chatId,
    });

    setFetchMessagesTrigger(!fetchMessagesTrigger);
    inputRef.current.value = "";
  }
  console.log(inputRef);
  return (
    <main className="h-full w-full bg-neutral-800 relative">
      {sendMessage && (
        <SendMessage
          sendMessage={sendMessage}
          setSendMessage={setSendMessage}
          setFetchMessagesTrigger={setFetchMessagesTrigger}
          fetchMessagesTrigger={fetchMessagesTrigger}
        />
      )}

      <section className="h-[100%] w-full flex">
        <div className="h-[92%] overflow-scroll  w-[85%]">
          {chatVisible && (
            <Chat
              setChatVisible={setChatVisible}
              chat={allChat}
              index={index}
            />
          )}
        </div>
        <div className="h-full w-[15%] bg-neutral-900 ">
          <div className="h-[8%] w-full">
            <button
              className="border-2 border-orange-500  text-neutral-300 h-full w-full rounded-md hover:bg-orange-500 hover:text-white transition-all"
              onClick={(e) => {
                e.preventDefault();
                setSendMessage(true);
              }}
            >
              Start new chat
            </button>
          </div>
          <div className="h-[92%] w-full">
            {allChat &&
              allChat.map((chat, i) => {
                return (
                  <article
                    className="h-[10%] w-full bg-neutral-900 cursor-pointer flex hover:bg-neutral-700 transition-all "
                    onClick={() => {
                      setChatVisible(true);
                      setChat(chat);
                      setIndex(i);

                      const drugiUser = chat.participants.filter(
                        (loggedUser) => loggedUser._id !== user._id
                      );
                      setSelectedUser(drugiUser[0]._id);
                      setChatId(chat._id);
                    }}
                  >
                    <div className="h-full w-[30%] flex p-2 items-center">
                      <img
                        className="h-full w-full rounded-full object-cover"
                        src={chat.participants[i].profilePicture}
                      />
                    </div>
                    <div className="h-full w-[70%] p-2 text-neutral-300  flex items-center">
                      @{chat.participants[i].username}
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
        <fieldset className="h-[8%] w-[85%] absolute bottom-0">
          <form
            className="h-full w-full bg-neutral-900 flex relative"
            onSubmit={handleSendMessage}
          >
            <div className="h-full w-full relative">
              <input
                ref={inputRef}
                className="h-full w-[80%] bg-neutral-500  p-4 text-2xl rounded-l-md outline-none"
                onChange={(e) => setTextMessage(e.target.value)}
              />
            </div>
            <button className="absolute right-0 h-full w-[20%] bg-neutral-900 border-2 border-orange-500 text-neutral-300  rounded-r-md hover:bg-orange-500 hover:text-white transition-all">
              Send
            </button>
          </form>
        </fieldset>
      </section>
    </main>
  );
};

export default Inbox;
