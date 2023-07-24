import React from "react";

const VideoPlayerModal = ({ setVideoPlayerModalVisible, video }) => {
  return (
    <div className="absolute top-0 h-full w-full bg-neutral-900 bg-opacity-40 z-50 flex justify-center items-center">
      <article className="h-[70%] w-[70%] bg-neutral-900 fl2 relative rounded-md p-4">
        <button
          className="absolute top-2 left-2 z-50"
          onClick={() => setVideoPlayerModalVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 text-orange-500 hover:text-orange-800 transition-all"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <video
          src={video}
          controls
          className="h-full w-full object-cover"
        ></video>
      </article>
    </div>
  );
};

export default VideoPlayerModal;
