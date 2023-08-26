import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StoreProductCard from "../User/Store/StoreProductCard";

const SearchResults = () => {
  // REDUX
  const search = useSelector((state) => state.search.value);
  const storeSubPage = useSelector((state) => state.storeSubPage.value);

  // OTHER
  const navigate = useNavigate();

  return (
    <>
      <section
        className={
          search && search.searchOption === "stores"
            ? "w-full h-[100%] grid grid-cols-2 lg:grid-cols-3 dgri overflow-scroll scrollbar-hide p-4 gap-4 "
            : "w-full h-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 dgri overflow-scroll scrollbar-hide p-4 gap-4 "
        }
      >
        {search &&
          search.searchResults.map((result, i) => {
            if (search.searchOption === "stores") {
              return (
                <article
                  className={
                    i > 2
                      ? "h-full w-full mt-4 rounded-md shadow-2xl cursor-pointer bg-neutral-900 "
                      : "h-full w-full  rounded-md shadow-2xl cursor-pointer bg-neutral-900 "
                  }
                  onClick={() => {
                    navigate(`/store/${result.storeName}/${result._id}`);
                  }}
                  key={i}
                >
                  {" "}
                  <div className="h-[30%] w-full p-4 text-neutral-400">
                    <span>Store name:</span>
                    <h1 className="text-2xl"> {result.storeName}</h1>
                  </div>
                  <img
                    src={result.storeProfile}
                    className="h-[70%] w-full object-cover rounded-b-md rounded-md"
                  ></img>
                </article>
              );
            } else {
              return (
                <article
                  onClick={() =>
                    navigate(
                      `/store/${result.store.storeName}/product/${result._id}`
                    )
                  }
                >
                  <StoreProductCard index={i} storeProducts={result} />;
                </article>
              );
            }
          })}{" "}
      </section>
    </>
  );
};

export default SearchResults;
