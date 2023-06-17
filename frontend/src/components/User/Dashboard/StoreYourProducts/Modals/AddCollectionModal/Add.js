import React from "react";

const Add = ({ setAdd }) => {
  return (
    <article className="h-full w-full bg-black p-4 bg-transparent rounded-md">
      <div className="h-[5%]">
        <button onClick={() => setAdd(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 bg-orange-500 rounded-sm text-white hover:scale-90 transition-all "
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="h-[85%] w-full flex justify-center items-center">
        <div className="h-[20%] w-full relative mb-16">
          <h1 className="text-2xl mb-4">Add a new collection</h1>
          <input className=" text-3xl p-2 h-full w-full border-2 border-gray-300 border-opacity-40" />
          <button className="absolute right-0 h-full text-5xl w-[15%] bg-gray-300 hover:bg-orange-500 text-white">
            +
          </button>
        </div>
      </div>
      <section className="h-[10%] w-full grid  gap-2 place-items-center"></section>
    </article>
  );
};

export default Add;
