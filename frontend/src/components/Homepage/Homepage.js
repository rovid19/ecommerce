import React, { useEffect, useState } from "react";
import axios from "axios";
import HomepageTrending from "./HomepageTrending";
import HomepageStoreCard from "./HomepageStoreCard";

const Homepage = () => {
  const [stores, setStores] = useState(null);

  useEffect(() => {
    axios.get("/api/store/get-homepage").then(({ data }) => {
      const newData = data.slice(0, 8);
      setStores(newData);
    });
  }, []);
  console.log(stores);
  return (
    <main className="skrin w-full flex justify-center">
      <section className="h-full w-[86%] grid place-items-center grid-rows-2  ">
        <div className=" h-full w-full p-2 relative group">
          <h1 className="absolute bottom-2 rounded-r-md text-white left-2 z-20 text-4xl bg-orange-500 p-4 group-hover:invisible transition-all">
            Trending store this week{" "}
          </h1>
          <HomepageTrending />
        </div>
        <div className=" h-full w-full grid grid-cols-4 grid-rows-2 gap-2 p-2">
          {stores &&
            stores.map((store, index) => (
              <HomepageStoreCard store={stores} index={index} />
            ))}
        </div>
      </section>
    </main>
  );
};

export default Homepage;
