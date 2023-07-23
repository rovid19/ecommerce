import React, { useEffect, useState } from "react";
import axios from "axios";
import HomepageTrending from "./HomepageTrending";
import HomepageStoreCard from "./HomepageStoreCard";
import HomepageProduct from "./HomepageProduct";
import HomepageProductCard from "./HomepageProductCard";
import StoreProductCard from "../User/Store/StoreProductCard";
import Navbar from "../Navbar/Navbar";
import YourFeed from "./YourFeed";
import { useSelector } from "react-redux";

const Homepage = () => {
  const [stores, setStores] = useState(null);
  const [products, setProducts] = useState(null);
  const [active, setActive] = useState("Your Feed");

  const user = useSelector((state) => state.userData.value.user);
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

  useEffect(() => {
    if (user) {
      setActive("Your Feed");
    } else {
      setActive("Home");
    }
  }, []);

  return (
    <>
      <main className="h-full w-full overflow-scroll  scrollbar-hide griddd bg-neutral-900 relative">
        <div className="absolute top-0 right-0 w-[8%] h-[4%] bg-black z-50 rounded-l-md">
          <select
            className={
              active === "Your Feed"
                ? "h-full w-full text-center bg-neutral-700 text-white rounded-l-md"
                : "h-full w-full text-center bg-neutral-900 text-white rounded-l-md"
            }
            onChange={(e) => setActive(e.target.value)}
          >
            <option className="text-sm text-center">Your Feed</option>
            <option className="text-sm text-center">Home</option>
          </select>
        </div>
        {active === "Your Feed" ? (
          <YourFeed />
        ) : (
          <>
            <div className="h-full w-full grid grid-rows-2">
              <section className=" h-full w-full relative group">
                <h1 className="absolute bottom-2 rounded-r-md text-white left-2 z-20 text-4xl bg-orange-500 p-4 group-hover:invisible transition-all">
                  Trending store this week{" "}
                </h1>
                <HomepageTrending />
              </section>
              <section className=" h-full w-full relative flex items-center ">
                <div className="h-[95%] w-full grid grid-cols-4 grid-rows-2 gap-2 p-2  ">
                  {stores &&
                    stores.map((store, index) => (
                      <HomepageStoreCard
                        store={stores}
                        index={index}
                        key={index}
                      />
                    ))}
                </div>
                <h1 className="absolute right-2 bottom-2 bg-orange-500 text-white p-2 text-2xl rounded-l-md ">
                  Other popular stores
                </h1>
              </section>
            </div>
            <div className="h-full w-full grid grid-rows-2">
              <section className="h-full w-full relative">
                <h1 className="absolute bottom-0 rounded-r-md text-white left-0 z-20 text-4xl bg-orange-500 p-4  transition-all">
                  Trending product this week{" "}
                </h1>
                <HomepageProduct />
              </section>
              <section className="h-full w-full relative  overflow-hidden">
                <div className="h-[95%] w-full grid grid-cols-4 grid-rows-2 gap-2 p-2 absolute bottom-0 ">
                  {products &&
                    products.map((product, index) => {
                      return (
                        <StoreProductCard
                          storeProducts={product}
                          index={index}
                          key={index}
                        />
                      );
                    })}
                </div>
                <h1 className="absolute right-2 bottom-0 bg-orange-500 text-white p-2 text-2xl rounded-l-md ">
                  Other popular products
                </h1>
              </section>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Homepage;
