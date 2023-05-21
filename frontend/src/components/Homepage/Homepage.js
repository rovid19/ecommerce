import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [stores, setStores] = useState(null);
  useEffect(() => {
    axios.get("/api/customer/get-homepage").then(({ data }) => setStores(data));
  }, []);
  console.log(stores);
  return (
    <main className="skrin w-full flex justify-center">
      <section className="h-full w-[80%] grid place-items-center  ">
        <h1>da </h1>
      </section>
    </main>
  );
};

export default Homepage;
