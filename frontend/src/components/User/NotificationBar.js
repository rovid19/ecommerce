import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTriggerGetChat } from "../../app/features/triggeri";

const NotificationBar = ({
  alertBar,
  setAlertBar,
  className,
  setClassName,
  chatMessageArray,
  setChatMessageArray,
  allChat,
  setAllChat,
  index,
  setIndex,
}) => {
  // STATES

  const [sviRazgovori, setSviRazgovori] = useState(null);
  const [date, setDate] = useState(new Date());

  // REDUX
  const user = useSelector((state) => state.userData.value.user);
  const triggerGetChat = useSelector(
    (state) => state.triggeri.value.triggerGetChat
  );

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
  const dispatch = useDispatch();

  // USEEFFECTS
  // ucitaj sve chatove korisnika
  useEffect(() => {
    axios.get("/api/customer/get-chat").then(({ data }) => {
      setAllChat(data);

      setSviRazgovori(Array(data.length).fill(0));
      // setRunUseEffect(true);
    });
  }, [triggerGetChat]);

  // functions
  const calculateTimeFromLastMessage = (date, time) => {
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
    <div
      className={className}
      onClick={() => {
        if (className.includes("openAlertBar")) {
        } else {
          setClassName((prev) => prev + "openAlertBar");
          setAlertBar(true);
          dispatch(setTriggerGetChat(!triggerGetChat));
        }
      }}
    >
      {!alertBar && (
        <div className="h-full w-full flex">
          <div className="w-[30%] h-full  flex items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="w-[70%] h-full flex items-center justify-center">
            <h1>{user && user.username}</h1>
          </div>
        </div>
      )}
      {alertBar && (
        <>
          <div className="h-[5%] w-full bg-red-200">
            <button
              className="text-neutral-500 absolute top-2 left-2 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();

                setClassName((prev) => {
                  const newPrev = className.replace(
                    "openAlertBar",
                    "closeAlertBar"
                  );
                  return newPrev;
                });
                setTimeout(() => {
                  setClassName((prev) => {
                    const newPrev = prev.replace("closeAlertBar", "");
                    return newPrev;
                  });
                  setAlertBar(false);
                }, [300]);
              }}
            >
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </>
            </button>
          </div>
          <div className="h-[40%] w-full bg-red-300 flex flex-col">
            <h1 className="p-2"> Notifications: </h1>
            <div className="bg-red-500 flex-grow"></div>
          </div>
          <div className="h-[55%] w-full bg-red-400 flex flex-col">
            <h1 className="p-2"> Chats: </h1>
            <div className="bg-red-600 flex-grow overflow-scroll scrollbar-hide">
              {allChat &&
                allChat.map((chat, i) => {
                  const filt = chat.participants.filter(
                    (userd) => userd._id !== user._id
                  );
                  const date = chat.messages[chat.messages.length - 1].date;
                  const time = chat.messages[chat.messages.length - 1].time;

                  return (
                    <article
                      className="h-[20%] w-full bg-neutral-900 cursor-pointer flex hover:bg-neutral-700 transition-all "
                      onClick={() => {
                        //navigate(`/inbox/${chat._id}`);
                        //setChatVisible(true);
                        //setChat(chat);
                        console.log(chatMessageArray);
                        let newArray = [...chatMessageArray];

                        console.log(newArray);
                        newArray.push(chat);
                        setChatMessageArray([...newArray]);
                        setIndex(i);

                        const drugiUser = chat.participants.filter(
                          (loggedUser) => loggedUser._id !== user._id
                        );
                        // setSelectedUser(drugiUser[0]._id);
                        //setChatId(chat._id);
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
                        {/*inboxMessages > 0
                          ? sviRazgovori[i] > 0 && (
                              <div className="h-full w-[15%] right-0 top-0 absolute flex items-center ">
                                + {sviRazgovori[i]}
                              </div>
                            )
                          : ""*/}
                        <h2 className="text-sm">
                          {chat.messages[chat.messages.length - 1].id ===
                          user._id
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
        </>
      )}
    </div>
  );
};

export default NotificationBar;
