import React, { useEffect, useState } from "react";
import axios from "axios";
import HomepageTrending from "./HomepageTrending";

const Homepage = () => {
  const [stores, setStores] = useState(null);

  useEffect(() => {
    axios.get("/api/customer/get-homepage").then(({ data }) => setStores(data));
  }, []);

  return (
    <main className="skrin w-full flex justify-center">
      <section className="h-full w-[80%] grid place-items-center grid-rows-2  ">
        <div className=" h-full w-full p-2 relative group">
          <h1 className="absolute bottom-2 rounded-r-md text-white left-2 z-20 text-4xl bg-orange-500 p-4 group-hover:invisible transition-all">
            Trending store this week{" "}
          </h1>
          <HomepageTrending />
        </div>
        <div className=" h-full w-full"></div>
      </section>
    </main>
  );
};

export default Homepage;
