import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import RegisterGooglePass from "../Register/RegisterGooglePass";
import {
  addUserDva,
  fetchStoreProducts,
  fetchUserData,
} from "../../app/features/User/userSlice";

import { switchValue } from "../../app/features/getUserTrigger";

const RegisterPagePartTwo = () => {
  const [googlePass, setGooglePass] = useState(false);
  const [confirmedPass, setConfirmedPass] = useState(null);
  const [email, setEmail] = useState(null);
  const [googleEmail, setGoogleEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [className, setClassName] = useState(
    "mt-4 bg-gray-300 text-white rounded-2xl p-3 hover:bg-orange-500 transition-all"
  );
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const input = useSelector((state) => state.registrationInput.value);
  const user = useSelector((state) => state.userData.value.user);

  async function handleRegister(e) {
    if (password === confirmedPass) {
      if ((email, storeName, password)) {
        try {
          e.preventDefault();
          await axios.post("/api/auth/register-user", {
            dynamicName: storeName,
            email,
            password,
            input,
          });

          await axios.post("/api/auth/login-user", {
            email,
            password,
          });

          await dispatch(fetchUserData()).unwrap();

          navigate("/");
        } catch (err) {
          setError(err.response.data);
        }
      } else {
        e.preventDefault();
        alert("you must fill out all empty fields");
      }
    } else {
      e.preventDefault();
      alert("your passwords do not match");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fl w-[80%] md:w-[50%] lg:w-[35%] 2xl:w-[20%]"
      >
        {googlePass ? (
          <RegisterGooglePass email={googleEmail} />
        ) : (
          <>
            <h1 className="text-center text-5xl">Dear, {input} </h1>
            <p className="mt-3 text-center text-gray-400">
              {input === "Customer"
                ? "Please fill out this form below"
                : "Please fill out form below in order to start selling"}
            </p>
            {error && (
              <h1 className="text-red-500 mt-2 font-bold text-center">
                {error}
              </h1>
            )}
            <form onSubmit={handleRegister} className="fl">
              <input
                type="text"
                placeholder="Email"
                className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-6 p-2"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder={input === "Customer" ? "Username" : "Store name"}
                className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-1 p-2"
                onChange={(e) => setStoreName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-1 p-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-1 p-2"
                onChange={(e) => setConfirmedPass(e.target.value)}
              />
              <button className={className}>continue</button>
            </form>
            <div className="flex mt-4 relative">
              <div className="border-t-2 border-gray-300 w-full mt-5 "></div>
              <h1 className="mt-2 ml-2 mr-2 text-gray-500">or</h1>
              <div className="border-t-2 border-gray-300 w-full mt-5 "></div>
            </div>
            <button className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  setGoogleEmail(decoded.email);
                  setGooglePass(true);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default RegisterPagePartTwo;
