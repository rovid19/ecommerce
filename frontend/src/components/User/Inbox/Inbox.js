import axios from "axios";
import React, { useEffect, useState } from "react";
import SendMessage from "./SendMessage";

const Inbox = () => {
  const [allChat, setAllChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(false);

  // ucitaj sve chatove korisnika
  useEffect(() => {
    axios.get("/api/customer/get-chat").then(({ data }) => setAllChat(data));
  }, []);
  return (
    <main className="h-full w-full bg-neutral-800 relative">
      {sendMessage && (
        <SendMessage
          sendMessage={sendMessage}
          setSendMessage={setSendMessage}
        />
      )}
      <fieldset className="h-[8%] w-full">
        <form className="h-full w-full bg-neutral-900 p-2 flex">
          <div className="h-full w-[70%] relative">
            <button className="absolute right-2 top-0 h-full flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-neutral-900 hover:text-neutral-300 transition-all"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <input className="h-full w-full bg-neutral-500 rounded-md" />
          </div>
          <div className="h-full w-[30%] flex justify-end ">
            <button
              className="border-2 border-orange-500  text-neutral-300 h-full w-[35%] rounded-md hover:bg-orange-500 hover:text-white transition-all"
              onClick={(e) => {
                e.preventDefault();
                setSendMessage(true);
              }}
            >
              Send message
            </button>
          </div>
        </form>
      </fieldset>
    </main>
  );
};

export default Inbox;
