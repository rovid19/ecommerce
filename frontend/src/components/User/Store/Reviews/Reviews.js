import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [comment, setComment] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const user = useSelector((state) => state.user.value);
  const selectedProduct = useSelector((state) => state.selectedProduct.value);
  function pictureUpload(e) {
    const file = e.target.files;
    const data = new FormData();
    data.append("photo", file[0]);
    axios
      .post("/api/store/upload-image", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        let array = [...pictures];
        array.push(data);
        setPictures(array);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/customer/submit-review", {
        id: user._id,
        pictures,
        comment,
        productId: selectedProduct,
      })
      .then(() => setTrigger(!trigger));
  }
  useEffect(() => {
    axios
      .post("/api/customer/reviews", { productId: selectedProduct })
      .then(({ data }) => setReviews(data));
  }, [trigger]);
  return (
    <section className="absolute right-0 top-0 h-full w-[25%] border-l-2 border-gray-300 border-opacity-25 ">
      <div className="h-[80%]">Reviews</div>
      <div className="h-[20%]">
        <form className="h-full w-full  " onSubmit={handleSubmit}>
          <fieldset className="h-full w-full relative ">
            <label className="h-full w-full  ">
              <input
                className="h-full w-full p-2 bg-gray-50"
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="w-[80%] h-[30%] absolute bottom-0 left-0 bg-orange-500 text-white hover:bg-gray-300 hover:text-black ">
                Post
              </button>
              <label
                onChange={pictureUpload}
                className="cursor-pointer w-[20%] h-[30%] absolute bottom-0 right-0 flex items-center justify-center  border-2 border-orange-500 border-opacity-75 hover:bg-gray-300 hover:border-0  "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-black"
                >
                  <path d="M9.97.97a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 01-1.06-1.06l3-3zM9.75 6.75v6a.75.75 0 001.5 0v-6h3a3 3 0 013 3v7.5a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3h3z" />
                  <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
                </svg>

                <input type="file" className="hidden" />
              </label>
            </label>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default Reviews;
