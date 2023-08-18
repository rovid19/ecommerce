import React, { useEffect, useState } from "react";
import axios from "axios";
import HomepageTrending from "./HomepageTrending";
import HomepageStoreCard from "./HomepageStoreCard";
import YourFeed from "./YourFeed";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../app/features/triggeri";

const Homepage = () => {
  // STATES
  const [stores, setStores] = useState(null);
  const [products, setProducts] = useState(null);

  // REDUX
  const active = useSelector((state) => state.triggeri.value.active);
  const user = useSelector((state) => state.userData.value.user);

  // OTHER
  const dispatch = useDispatch();

  // USEEFFECTS
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

  // ak je user ulogiran stavi mu your feed odmah, a ak nije onda ga prebaci na homepage
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      if (active) {
      } else {
        dispatch(setActive("Following"));
      }
    } else {
      if (active) {
      } else {
        dispatch(setActive("Home"));
      }
    }
  }, [user]);

  return (
    <>
      <main className="h-full w-full overflow-scroll  scrollbar-hide griddd bg-neutral-900 relative">
        {active === "Following" ? (
          ""
        ) : (
          <div
            className={
              "absolute top-0 right-0 lg:w-[8%] w-[50px] h-[50px] bg-black z-50 rounded-l-md"
            }
          >
            <select
              className={
                active === "Following" || active === "Trending"
                  ? "h-full w-full text-center bg-neutral-700 text-white rounded-l-md"
                  : "h-full w-full text-center bg-neutral-900 text-white rounded-l-md"
              }
              onChange={(e) => dispatch(setActive(e.target.value))}
              defaultValue={active}
            >
              <option className="text-sm text-center">Home</option>
              {user && Object.keys(user).length > 0 && (
                <option className="text-sm text-center" value="Following">
                  Following
                </option>
              )}
              <option className="text-sm text-center">Trending</option>
            </select>
          </div>
        )}
        {active === "Following" || active === "Trending" ? (
          <YourFeed />
        ) : (
          <>
            <div className="h-full w-full grid grid-rows-2">
              <section className=" h-full w-full relative group">
                <h1 className="absolute bottom-0 rounded-r-md text-white left-0 z-20 text-2xl bg-neutral-800 p-4 group-hover:invisible transition-all">
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
                <h1 className="absolute right-0 bottom-0 bg-neutral-800 text-white p-2 text-xl rounded-l-md  ">
                  Other popular stores
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
