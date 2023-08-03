import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const VideoUploadModal = ({ setVideoModalVisible, setVideo }) => {
  const [progress, setProgress] = useState(null);
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const [message, setMessage] = useState(
    "this window will automatically close as soon as your video is uploaded"
  );
  const [videoFormData, setVideoFormData] = useState(null);

  function setVideoo(e) {
    const file = e.target.files;
    const formData = new FormData();
    formData.append("video", file[0]);
    setVideoFormData(formData);
  }

  useEffect(() => {
    if (videoFormData) {
      async function handleUploadVideo() {
        const data = await axios.post(
          "/api/store/upload-video",
          videoFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              let percent = Math.floor((loaded * 100) / total);
              console.log(`${loaded}kb of ${total}kb / ${percent}%`);
              if (percent < 100) {
                setProgress("started");
              }
            },
          }
        );
        setVideo(data.data);
        setVideoModalVisible(false);
        //
      }
      handleUploadVideo();
    }
  }, [videoFormData]);

  return (
    <div className="absolute top-0 h-full w-full bg-neutral-900 bg-opacity-40 z-50 flex justify-center items-center">
      <motion.article
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="lg:h-[50%] lg:w-[50%] h-[80%] w-full bg-neutral-900 fl2 relative"
      >
        <button
          className="absolute top-2 left-2"
          onClick={() => setVideoModalVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 text-neutral-700 hover:text-orange-500 transition-all"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div className=" w-full h-[80%] fl2">
          <h1 className="text-white mb-1">{progress ? message : ""}</h1>
          <label className="bg-neutral-700 text-white p-4 rounded-md hover:bg-orange-500 transition-all cursor-pointer">
            Upload video
            <input
              type="file"
              className="hidden h-full w-full"
              onChange={setVideoo}
            />
          </label>
          <h1 className="text-neutral-600 border-t-2 border-b-2 border-neutral-600 border-opacity-10 w-[50%] text-center mt-4 mb-4 p-2">
            {" "}
            or{" "}
          </h1>
          <form className="w-full h-[20%] fl2">
            <h1 className=" text-white mb-2">Add video from youtube</h1>
            <div className="w-[80%] h-[60%] relative ">
              <button
                className="absolute h-full w-[5%] flex items-center top-0 right-0 rounded-md"
                onClick={() => {
                  setVideo(youtubeVideo);
                  setVideoModalVisible(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-neutral-700 hover:text-orange-500 transition-all"
                >
                  <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                </svg>
              </button>
              <input
                className="bg-neutral-800 rounded-md h-full w-full p-2 text-white "
                onChange={(e) => setYoutubeVideo(e.target.value)}
              />
            </div>
          </form>
        </div>
      </motion.article>
    </div>
  );
};

export default VideoUploadModal;
