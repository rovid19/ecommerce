import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SendMessage from "./SendMessage";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../app/features/User/userSlice";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  // STATES
  const [allChat, setAllChat] = useState([]);
  const [sendMessage, setSendMessage] = useState(false);
  const [fetchMessagesTrigger, setFetchMessagesTrigger] = useState(false);
  const [chat, setChat] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [index, setIndex] = useState(null);
  const [textMessage, setTextMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [sviRazgovori, setSviRazgovori] = useState(null);
  const [runUseEffect, setRunUseEffect] = useState(false);
  const [seenTrigger, setSeenTrigger] = useState(false);
  const [date, setDate] = useState(new Date());

  // REDUX
  const user = useSelector((state) => state.userData.value.user);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const inboxMessages = useSelector(
    (state) => state.inboxMessages.value.allChat
  );
  const socket = useSelector((state) => state.socket.value);

  // OTHER
  //date
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  //time
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();

  // USEEFFECTS
  useEffect(() => {
    if (runUseEffect) {
      let newArray = [...sviRazgovori];
      user.allChat.forEach((item, index) => {
        const zbroj = item.newChatCount - item.oldChatCount;
        newArray[index] = zbroj;
      });
      setSviRazgovori(newArray);
      setRunUseEffect(false);
      dispatch(fetchUserData());
    }
  }, [runUseEffect]);

  // socket za autorefresh allChata
  useEffect(() => {
    const handler = () => {
      setFetchMessagesTrigger((prevState) => !prevState);
    };

    socket.on("newChat", handler);

    return () => {
      socket.off("newChat", handler);
    };
  }, []);

  // ucitaj sve chatove korisnika
  useEffect(() => {
    axios.get("/api/customer/get-chat").then(({ data }) => {
      setAllChat(data);

      setSviRazgovori(Array(data.length).fill(0));
      setRunUseEffect(true);
    });
  }, [fetchMessagesTrigger, getUserTrigger]);

  // seenanje poruke dok si u chatu s nekim
  useEffect(() => {
    if (allChat) {
      if (user.allChat[index]) {
        let result =
          user.allChat[index].oldChatCount !== user.allChat[index].newChatCount;

        if (result) {
          setSeenTrigger(!seenTrigger);
        }
      }
    }
  }, [allChat]);

  // FUNCTIONS
  //posalji poruku
  async function handleSendMessage(e) {
    e.preventDefault();
    await axios.post("/api/customer/send-message", {
      senderId: user._id,
      receiverId: selectedUser,
      message: textMessage,
      chatId,
      date: formattedDate,
      time: formattedTime,
    });

    inputRef.current.value = "";
  }

  // izracun kolko je vremena proslo od zadnje poruke
  const calculateTimeFromLastMessage = (date, time) => {
    console.log(time);
    // ako je poruka poslana danas
    if (date === formattedDate) {
      const trenutnoSati = Number(formattedTime.slice(0, 2));
      const trenutnoMinuta = Number(formattedTime.slice(3, 5));
      const vrijemeZadnjePorukeSati = Number(time.slice(0, 2));
      const vrijemeZadnjePorukeMinute = Number(time.slice(3, 5));
      const vrijemeZadnjePorukeSekunde = Number(time.slice(6, 8));
      const trenutnoPopodneIliNoc = formattedTime.slice(8, 11);
      const porukaPopodneIliNoc = time.slice(8, 11);

      let minuteOdZadnjePoruke = 0;
      // ako je poruka poslana u AMu i trenutno AM
      if (trenutnoPopodneIliNoc === porukaPopodneIliNoc) {
        const minute = 60 - vrijemeZadnjePorukeMinute;
        let sati = vrijemeZadnjePorukeSati + 1;
        if (sati > 12) {
          sati = sati - 12;
        }
        const zbroj = (trenutnoSati - sati) * 60;
        minuteOdZadnjePoruke = zbroj + minute + trenutnoMinuta;
      }
      // ako je poruka poslana u AMu i trenutno je PM
      else {
        const minute = 60 - vrijemeZadnjePorukeMinute;
        let sati = vrijemeZadnjePorukeSati + 1;
        if (sati > 12) {
          sati = sati - 12;
        }
        const zbroj = (trenutnoSati - sati + 12) * 60;
        minuteOdZadnjePoruke = zbroj + minute + trenutnoMinuta;
      }

      // ako je poruka poslana prije manje od sat vremena
      if (minuteOdZadnjePoruke < 60) {
        //ako je poruka poslana prije manje od minutu
        if (minuteOdZadnjePoruke <= 1) {
          const zbroj = 60 - vrijemeZadnjePorukeSekunde;
          return zbroj + "sec ago";
        } else {
          return minuteOdZadnjePoruke + "min ago";
        }
      } else {
        const zbroj = Math.floor(minuteOdZadnjePoruke / 60);
        return zbroj + "hours ago";
      }
    }
    // ako poruka nije poslana danas
    else {
      const trenutniDan = Number(formattedDate.slice(3, 5));
      const danOdZadnjePoruke = Number(date.slice(3, 5));
      let dan = trenutniDan - danOdZadnjePoruke;
      if (dan < 0) {
        dan = dan + 31;
      }
      if (dan < 7) {
        return dan + "days ago";
      } else {
        return "more than a week ago";
      }
    }
  };

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

      <section className="h-[100%] w-full flex overflow-scroll scrollbar-hide">
        <div className="h-[92%] overflow-scroll scrollbar-hide  w-[85%]">
          {chatVisible && (
            <Chat
              setChatVisible={setChatVisible}
              chat={allChat}
              index={index}
              fetchMessagesTrigger={fetchMessagesTrigger}
              setFetchMessagesTrigger={setFetchMessagesTrigger}
              seenTrigger={seenTrigger}
              setSeenTrigger={setSeenTrigger}
            />
          )}
        </div>
        <div className="h-full w-[40%] md:w-[30%] lg:w-[15%] bg-neutral-900 ">
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
                const filt = chat.participants.filter(
                  (userd) => userd._id !== user._id
                );
                const date = chat.messages[chat.messages.length - 1].date;
                const time = chat.messages[chat.messages.length - 1].time;

                return (
                  <article
                    className="h-[10%] w-full bg-neutral-900 cursor-pointer flex hover:bg-neutral-700 transition-all "
                    onClick={() => {
                      navigate(`/inbox/${chat._id}`);
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
                    <div className="h-full w-[40%] md:w-[30%] flex p-2 items-center">
                      <img
                        className="h-full w-full rounded-full object-cover"
                        src={filt[0].profilePicture}
                      />
                    </div>
                    <div className="h-full w-[60%] md:w-[70%] p-2  text-neutral-300 text-sm md:text-base  fl">
                      @{filt[0].username}
                      {inboxMessages > 0
                        ? sviRazgovori[i] > 0 && (
                            <div className="h-full w-[15%] right-0 top-0 absolute flex items-center ">
                              + {sviRazgovori[i]}
                            </div>
                          )
                        : ""}
                      <h2 className="text-sm">
                        {chat.messages[chat.messages.length - 1].id === user._id
                          ? "You:"
                          : ""}{" "}
                        {chat.messages[chat.messages.length - 1].messages} -{" "}
                        {calculateTimeFromLastMessage(date, time)}
                      </h2>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
        {chatVisible && (
          <fieldset className="h-[8%] w-[68%] md:w-[74%] lg:w-[85%] absolute bottom-0">
            <form
              className="h-full w-full bg-neutral-900 flex relative"
              onSubmit={handleSendMessage}
            >
              <div className="h-full w-full relative">
                <input
                  ref={inputRef}
                  className="h-full w-[80%] bg-neutral-500  p-4 text-xl lg:text-2xl rounded-l-md outline-none"
                  onChange={(e) => setTextMessage(e.target.value)}
                />
              </div>
              <button className="absolute right-0 h-full w-[20%] bg-neutral-900 border-2 border-orange-500 text-neutral-300  rounded-r-md hover:bg-orange-500 hover:text-white transition-all">
                Send
              </button>
            </form>
          </fieldset>
        )}
      </section>
    </main>
  );
};

export default Inbox;
