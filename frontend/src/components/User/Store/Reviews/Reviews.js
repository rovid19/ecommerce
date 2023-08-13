import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOpenReviewPic } from "../../../../app/features/User/openReviewPic";
import { setReviewPic } from "../../../../app/features/User/reviewPic";
import { useRef } from "react";
import { setViewReviewPic } from "../../../../app/features/User/viewReviewPic";
import { setviewImage } from "../../../../app/features/User/viewImage";
import ReviewStarRating from "./ReviewStarRating";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import getUserTrigger, {
  switchValue,
} from "../../../../app/features/getUserTrigger";
import { fetchUserData } from "../../../../app/features/User/userSlice";

const Reviews = () => {
  // STATES
  const [reviews, setReviews] = useState(null);
  const [comment, setComment] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [ratingActive, setRatingActive] = useState(false);
  const [userCommented, setUserCommented] = useState(false);
  const [rating, setRating] = useState(null);
  const [postTrigger, setPostTrigger] = useState(false);
  const [deleteReview, setDeleteReview] = useState(null);

  // REDUX
  const viewReviewPic = useSelector((state) => state.viewReviewPic.value);
  const viewImage = useSelector((state) => state.viewImage.value);
  const selectedProduct = useSelector((state) => state.selectedProduct.value);
  const user = useSelector((state) => state.userData.value.user);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);

  const reviewPic = useSelector((state) => state.reviewPic.value);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { productId } = useParams();

  // FUNCTIONS
  function pictureUpload(e) {
    const file = e.target.files;
    const data = new FormData();
    data.append("photo", file[0]);
    axios
      .post("/api/store/upload-image", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        dispatch(setReviewPic(data));
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("/api/customer/submit-review", {
      id: user._id,
      reviewPic,
      comment,
      productId: selectedProduct,
      rating,
    });

    await dispatch(fetchUserData()).unwrap();

    setTrigger(!trigger);
    inputRef.current.value = "";
  }

  /* USEEFFECT
  useEffect(() => {
    if (!user.status) {
    }
  }, [user.status]);*/
  useEffect(() => {
    axios
      .post("/api/customer/reviews", { productId: selectedProduct })
      .then(({ data }) => setReviews(data))
      .then(() => setPostTrigger(!trigger));
  }, [trigger]);

  useEffect(() => {
    if (deleteReview) {
      async function fetch() {
        await axios.post("/api/customer/delete-review", {
          deleteReview,
          productId,
        });

        await dispatch(fetchUserData()).unwrap();
        setTrigger(!trigger);
        setPostTrigger(!trigger);
      }
      fetch();
    }
  }, [deleteReview]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      if (user.reviewsLeft.includes(productId)) {
        setUserCommented(true);
      } else {
        setUserCommented(false);
      }
    }
  }, [postTrigger]);

  return (
    <section
      className={
        viewImage
          ? "hidden"
          : "absolute top:[100%] lg:right-0 lg:top-0 h-full w-full lg:w-[25%] border-l-2 border-neutral-600 border-opacity-25 bg-neutral-800   "
      }
    >
      <div className="h-[80%] overflow-scroll scrollbar-hide">
        <h1 className="p-3 text-neutral-600 bg-neutral-900 mb-1">
          {reviews && reviews.length} Reviews:
        </h1>{" "}
        {reviews &&
          reviews.map((review, i) => {
            return (
              <article
                className={
                  i === 0 && review.pictures.length > 0
                    ? "h-[30%] w-full bg-neutral-900 p-2 relative shadow-lg"
                    : review.pictures.length > 0
                    ? "h-[30%] w-full bg-neutral-900 mt-1 p-2 relative shadow-lg"
                    : "h-[20%] w-full bg-neutral-900 mt-1 p-2 relative shadow-lg"
                }
                key={i}
              >
                {user.username === review.commentBy[0].username && (
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => setDeleteReview(review._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-neutral-400 bg-neutral-800 p-1 rounded-md hover:bg-orange-500 hover:text-white transition-all"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
                <div className="h-[15%] w-full flex items-center">
                  <h1 className="font-bold text-xl">
                    {review.commentBy[0].username}
                  </h1>
                  <span className="ml-2 flex items-center gap-2">
                    {review.rating}{" "}
                    {(() => {
                      switch (review.rating) {
                        case 1:
                          return <FaStar color="#ffc107" size={15} />;

                        case 2:
                          return (
                            <>
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                            </>
                          );

                        case 3:
                          return (
                            <>
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                            </>
                          );

                        case 4:
                          return (
                            <>
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                            </>
                          );

                        case 5:
                          return (
                            <>
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                              <FaStar color="#ffc107" size={15} />
                            </>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </span>
                </div>
                <div className="h-[85%] w-full overflow-hidden  ">
                  <p>{review.comment}</p>
                  <div className="flex h-full overflow-hidden">
                    {review.pictures.map((pic, index) => {
                      return (
                        <img
                          onClick={() => {
                            dispatch(setViewReviewPic(pic));
                            dispatch(setviewImage(true));
                          }}
                          className="h-full w-[20%] object-cover rounded-md cursor-pointer"
                          src={pic}
                          key={index}
                        ></img>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
      </div>
      {user && Object.keys(user).length > 0 && (
        <div className="h-[20%] ">
          {userCommented ? (
            ""
          ) : ratingActive ? (
            <form className="h-full w-full  " onSubmit={handleSubmit}>
              <fieldset className="h-full w-full relative ">
                <label className="h-full w-full  ">
                  <input
                    ref={inputRef}
                    className={
                      reviewPic && reviewPic.length > 0
                        ? "h-[70%] w-[80%] p-2 bg-neutral-700 rounded-t-md"
                        : "h-[70%] w-full p-2 bg-neutral-700 rounded-t-md"
                    }
                    onChange={(e) => setComment(e.target.value)}
                  />
                  {reviewPic && reviewPic.length > 0 ? (
                    <div className="absolute right-0 top-0 h-[70%] w-[20%] bg-gray-50  ">
                      <div
                        className="absolute h-full w-full top-0 bg-black bg-opacity-20 hover:bg-transparent transition-all cursor-pointer"
                        onClick={() => dispatch(setOpenReviewPic(true))}
                      ></div>
                      <img
                        src={reviewPic && reviewPic[0]}
                        className="h-[50%] w-full object-cover"
                      ></img>
                      <img
                        src={reviewPic && reviewPic[1]}
                        className="h-[50%] w-full object-cover"
                      ></img>
                    </div>
                  ) : (
                    ""
                  )}
                  <button className="w-[80%] h-[30%] absolute bottom-0 left-0 bg-neutral-900 text-neutral-300 hover:bg-orange-500 transition-all hover:text-white rounded-b-md">
                    Post
                  </button>
                  <label
                    onChange={pictureUpload}
                    className="cursor-pointer w-[20%] h-[30%] absolute bottom-0 right-0 flex items-center justify-center   bg-neutral-500 group rounded-md  "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 text-neutral-800 group-hover:text-white "
                    >
                      <path d="M9.97.97a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 01-1.06-1.06l3-3zM9.75 6.75v6a.75.75 0 001.5 0v-6h3a3 3 0 013 3v7.5a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3h3z" />
                      <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
                    </svg>

                    <input type="file" className="hidden" />
                  </label>
                </label>
              </fieldset>
            </form>
          ) : (
            <ReviewStarRating
              setRatingActive={setRatingActive}
              ratingActive={ratingActive}
              rating={rating}
              setRating={setRating}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Reviews;
