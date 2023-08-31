import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SendMessage = ({
  setSendMessage,
  fetchMessagesTrigger,
  setFetchMessagesTrigger,
}) => {
  // STATES
  const [allUsers, setAllUsers] = useState(null);
  const [allUsersC, setAllUsersC] = useState(null);
  const [inputUser, setInputUser] = useState(null);
  const [oldInput, setOldInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [date, setDate] = useState(new Date());

  // REDUX
  const user = useSelector((state) => state.userData.value.user);

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

  // USEEFFECTS
  // loadanje svih usera na stranici
  useEffect(() => {
    axios.get("/api/customer/all-users").then(({ data }) => {
      setAllUsers(data);
      setAllUsersC(data);
    });
  }, []);

  // autocomplete za trazenje usera na stranici
  useEffect(() => {
    if (inputUser) {
      if (oldInput.length > inputUser.length) {
        const newArray = [...allUsersC];
        const da = newArray.filter((item) => item.username.includes(inputUser));
        setAllUsers(da);
        setOldInput(inputUser);
      } else {
        const newArray = [...allUsers];
        const da = newArray.filter((item) => item.username.includes(inputUser));
        setAllUsers(da);
        setOldInput(inputUser);
      }
    } else if (allUsers) {
      setAllUsers(allUsersC);
    }
  }, [inputUser]);

  // FUNCTIONS
  // slanje poruke
  async function handleSendMessage(e) {
    e.preventDefault();
    await axios.post("/api/customer/send-message", {
      senderId: user._id,
      receiverId: selectedUser.userId,
      message,
      date: formattedDate,
      time: formattedTime,
    });
    setSendMessage(false);
    setFetchMessagesTrigger(!fetchMessagesTrigger);
  }
  return (
    <div className="z-50 absolute h-full w-full bg-black bg-opacity-30 flex justify-center items-center">
      <article className="lg:h-[50%] h-[60%] md:w-[90%] lg:w-[50%] w-full relative bg-neutral-900 rounded-md">
        <button
          className="absolute top-2 left-2"
          onClick={() => setSendMessage(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-neutral-400 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <form
          className="h-full w-full flex justify-center items-center"
          onSubmit={handleSendMessage}
        >
          <div className="h-[70%] w-[70%] overflow-scroll scrollbar-hide">
            {selectedUser ? (
              <div className="h-[20%] w-full flex relative bg-neutral-900 rounded-md ">
                <button
                  className="absolute right-2 flex items-center h-full text-neutral-500 hover:text-neutral-200 transition-all "
                  onClick={() => {
                    setSelectedUser(null);
                    setInputUser(null);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <div className="h-full w-[20%] md:w-[10%] flex p-2 items-center">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={selectedUser.pic}
                  />
                </div>
                <div className="h-full w-[80%] p-2 text-neutral-300  flex items-center">
                  @{selectedUser.username}
                </div>
              </div>
            ) : (
              <div className="h-[20%] w-full relative">
                <input
                  className="h-full w-full bg-neutral-800 text-neutral-300 p-4 rounded-md text-xl lg:text-xl outline-none"
                  placeholder="To :"
                  onChange={(e) => setInputUser(e.target.value)}
                />
                {inputUser && inputUser.length > 0 && (
                  <div className="absolute bottom-[-1] bg-neutral-900 w-full  z-20">
                    {allUsers &&
                      allUsers.map((item, i) => {
                        return (
                          <article
                            key={i}
                            className="w-full h-[60px] bg-neutral-800 rounded-md flex mt-1 cursor-pointer hover:bg-neutral-600 transition-all"
                            onClick={() =>
                              setSelectedUser({
                                userId: item._id,
                                username: item.username,
                                pic: item.store.storeProfile,
                              })
                            }
                          >
                            <div className="h-full w-[20%]  md:w-[10%] flex p-2 items-center">
                              <img
                                className="h-full w-full rounded-full object-cover"
                                src={
                                  item.role === "Store Owner"
                                    ? item.store.storeProfile
                                    : ""
                                }
                              />{" "}
                            </div>
                            <div className="h-full w-[80%] p-2 text-neutral-300  flex items-center">
                              @{item.username}{" "}
                            </div>
                          </article>
                        );
                      })}
                  </div>
                )}
              </div>
            )}
            <div className="w-full h-[65%] bg-neutral-800 rounded-md p-4 mt-1 relative">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                className="h-full w-full bg-neutral-800 align-top text-base md:text-xl text-neutral-300 outline-none"
                placeholder="Text :"
              />
            </div>{" "}
            <div className="h-[12%] w-full flex justify-end">
              <button className="bg-orange-500 text-white lg:text-neutral-300 w-full h-full mt-1 rounded-md hover:text-white transition-all text-xl ">
                Send
              </button>{" "}
            </div>
          </div>
        </form>
      </article>
    </div>
  );
};

export default SendMessage;
