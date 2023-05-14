import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StoreProductCard from "../../Store/StoreProductCard";
import axios from "axios";
const SearchResults = () => {
  const searchResults = useSelector((state) => state.searchResults.value);

  const [getStore, setGetStore] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const navigate = useNavigate();
  const { searchOption } = useParams();
  useEffect(() => {
    if (getStore) {
      axios
        .post("/api/customer/get-products-store", { id: getStore })
        .then(({ data }) => {
          setSelectedStore(data);
        });
    }
  }, [getStore]);

  useEffect(() => {
    if (selectedStore) {
      navigate(`/store/${selectedStore.storeName}/product/${getStore}`);
    }
  }, [selectedStore]);

  return (
    <main className="w-full h-full flex justify-center">
      <section className="w-[85%] h-full flex gap-2">
        {searchResults.length === 0 && searchOption === "Stores" ? (
          <div className="h-full w-full flex items-center justify-center ">
            <h1 className="text-4xl">No stores found! </h1>{" "}
          </div>
        ) : searchResults.length === 0 && searchOption === "Products" ? (
          <div className="h-full w-full flex items-center justify-center ">
            <h1 className="text-4xl">No products found! </h1>{" "}
          </div>
        ) : (
          ""
        )}
        {searchResults &&
          searchResults.map((result, i) => {
            if (result.search === "Stores") {
              return (
                <article
                  className="h-[40%] w-[30%] mt-1 rounded-md shadow-lg cursor-pointer"
                  onClick={() => {
                    navigate(`/store/${result.storeName}/${result._id}`);
                  }}
                >
                  <img
                    src={result.storeProfile}
                    className="h-[70%] w-full object-cover rounded-b-md"
                  ></img>
                  <div className="h-[30%] w-full p-4">
                    <h1 className="text-5xl">{result.storeName}</h1>
                  </div>
                </article>
              );
            } else {
              console.log(result);
              return (
                <article
                  className="h-[280px] "
                  onClick={() => setGetStore(result._id)}
                >
                  <StoreProductCard storeProducts={result} />
                </article>
              );
            }
          })}
      </section>
    </main>
  );
};

export default SearchResults;
