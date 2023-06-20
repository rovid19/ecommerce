import React, { useEffect, useState } from "react";
import axios from "axios";
import HomepageTrending from "./HomepageTrending";
import HomepageStoreCard from "./HomepageStoreCard";
import HomepageProduct from "./HomepageProduct";
import HomepageProductCard from "./HomepageProductCard";
import StoreProductCard from "../User/Store/StoreProductCard";
import Navbar from "../Navbar/Navbar";

const Homepage = () => {
  const [stores, setStores] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get("/api/store/get-homepage").then(({ data }) => {
      const newData = data.slice(0, 8);
      setStores(newData);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/store/get-products").then(({ data }) => {
      const newData = data.slice(0, 8);
      setProducts(newData);
    });
  }, []);

  return (
    <>
      <div className="w-full h-16 z-50">
        <Navbar />
      </div>

      <main className="skrin2  flex justify-center  ">
        <div className="h-full w-[86%] grid place-items-center grid-rows-4 ">
          <section className=" h-full w-full p-2 relative group">
            <h1 className="absolute bottom-2 rounded-r-md text-white left-2 z-20 text-4xl bg-orange-500 p-4 group-hover:invisible transition-all">
              Trending store this week{" "}
            </h1>
            <HomepageTrending />
          </section>
          <section className=" h-full w-full relative  ">
            <div className="h-[95%] w-full grid grid-cols-4 grid-rows-2 gap-2 p-2 absolute bottom-0 ">
              {stores &&
                stores.map((store, index) => (
                  <HomepageStoreCard store={stores} index={index} />
                ))}
            </div>
            <h1 className="absolute right-2 bottom-2 bg-orange-500 text-white p-2 text-2xl rounded-l-md ">
              Other popular stores
            </h1>
          </section>
          <section className="h-full w-full relative">
            <h1 className="absolute bottom-0 rounded-r-md text-black left-0 z-20 text-4xl bg-gray-50 p-4  transition-all">
              Trending product this week{" "}
            </h1>
            <HomepageProduct />
          </section>
          <section className="h-full w-full relative  overflow-hidden">
            <div className="h-[95%] w-full grid grid-cols-4 grid-rows-2 gap-2 p-2 absolute bottom-0 ">
              {products &&
                products.map((product, index) => {
                  return (
                    <StoreProductCard storeProducts={product} index={index} />
                  );
                })}
            </div>
            <h1 className="absolute right-2 bottom-0 bg-orange-500 text-white p-2 text-2xl rounded-l-md ">
              Other popular products
            </h1>
          </section>
        </div>
      </main>
    </>
  );
};

export default Homepage;
