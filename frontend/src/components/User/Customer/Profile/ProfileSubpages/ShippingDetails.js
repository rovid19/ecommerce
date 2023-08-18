import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ShippingDetails = () => {
  // STATES
  const [address, setAddress] = useState(null);
  const [region, setRegion] = useState(null);
  const [addressDva, setAddressDva] = useState(null);
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [postalCode, setPostalCode] = useState(null);

  // USEEFFECTS
  useEffect(() => {
    axios.get("/api/customer/get-shipping-details").then(({ data }) => {
      setAddress(data[0].address);
      setAddressDva(data[0].addressDva);
      setCountry(data[0].country);
      setPhoneNumber(data[0].phoneNumber);
      setPostalCode(data[0].postalCode);
      setRegion(data[0].region);
    });
  }, []);

  // FUNCTIONS
  function handleShippingInfoChange(e) {
    e.preventDefault();
    axios.post("/api/customer/update-shipping-details", {
      address,
      addressDva,
      region,
      country,
      postalCode,
      phoneNumber,
    });
  }

  return (
    <div className="h-full w-full bg-neutral-800 flex items-center justify-center">
      <form
        className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%] h-full fl2"
        onSubmit={handleShippingInfoChange}
      >
        <div className="lg:h-[20%] h-[15%] flex justify-center items-center ">
          {" "}
          <h1
            className="mt-12 text-base md:text-xl text-neutral-300
          "
          >
            Enter your shipping information
          </h1>
        </div>
        <div className="h-[50%] w-full fl2    ">
          <input
            type="text"
            placeholder="Country"
            className="h-[20%] w-[65%] bg-neutral-900 text-neutral-300 mt-1 rounded-md p-2"
            onChange={(e) => setCountry(e.target.value)}
            defaultValue={country}
          />
          <input
            type="text"
            placeholder="Region"
            className="h-[20%] w-[65%] bg-neutral-900 text-neutral-300 mt-1 rounded-md p-2"
            onChange={(e) => setRegion(e.target.value)}
            defaultValue={region}
          />
          <input
            type="text"
            placeholder="Address 1"
            className="h-[20%] w-[65%] bg-neutral-900 text-neutral-300 mt-1 rounded-md p-2"
            onChange={(e) => setAddress(e.target.value)}
            defaultValue={address}
          />
          <input
            type="text"
            placeholder="Address 2"
            className="h-[20%] w-[65%] bg-neutral-900 text-neutral-300 mt-1 rounded-md p-2"
            onChange={(e) => setAddressDva(e.target.value)}
            defaultValue={addressDva}
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="h-[20%] w-[65%] bg-neutral-900 text-neutral-300 mt-1 rounded-md p-2"
            onChange={(e) => setPostalCode(e.target.value)}
            defaultValue={postalCode}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="h-[20%] w-[65%] bg-neutral-900 text-neutral-300 mt-1 rounded-md p-2"
            onChange={(e) => setPhoneNumber(e.target.value)}
            defaultValue={phoneNumber}
          />
        </div>
        <div className="w-full h-[20%] flex justify-center mt-10 ">
          <button className="bg-orange-500 h-[35%] w-[50%] text-white rounded-md hover:w-[65%] transition-all ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingDetails;
