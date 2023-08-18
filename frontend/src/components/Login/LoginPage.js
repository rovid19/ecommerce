import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {
  fetchStoreProducts,
  fetchUserData,
} from "../../app/features/User/userSlice";
import LoginGooglePass from "./LoginGooglePass";
import { getStoreSubPage } from "../../app/features/storeSubPage";
import { setActive, setRunUseEffect } from "../../app/features/triggeri";

const LoginPage = () => {
  // STATES
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [googlePass, setGooglePass] = useState(false);
  const [googleMail, setGoogleMail] = useState(null);
  const [error, setError] = useState(null);

  // OTHER
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FUNCTIONS
  async function handleLogin(e) {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login-user", {
        email,
        password,
      });

      await dispatch(fetchUserData()).unwrap();

      dispatch(fetchStoreProducts());
      dispatch(getStoreSubPage("homepage"));
      dispatch(setRunUseEffect(true));
      dispatch(setActive(null));
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Incorrect email or password");
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fl w-[80%] md:w-[50%] lg:w-[35%] 2xl:w-[20%]"
      >
        {googlePass ? (
          <LoginGooglePass email={googleMail} />
        ) : (
          <>
            <h1 className="text-center text-5xl text-neutral-300">Hello</h1>
            <p className="mt-1 text-center text-neutral-400">
              If you don't have an account,{" "}
              <span className="font-bold">
                <Link to="/register">click here</Link>
              </span>
            </p>
            <form className="fl text-white" onSubmit={handleLogin}>
              {error && (
                <h1 className="text-red-500 mt-2 font-bold text-center">
                  {error}
                </h1>
              )}
              <input
                type="text"
                placeholder="Email"
                className="border-2 border-neutral-300 border-opacity-10 rounded-xl mt-4 p-2 bg-neutral-800"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="border-2 border-neutral-300 border-opacity-10 rounded-xl mt-1 p-2 bg-neutral-800"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="mt-4 bg-neutral-600 text-white rounded-2xl p-3 hover:bg-orange-500">
                continue
              </button>
            </form>
            <div className="flex mt-4 relative">
              <div className="border-t-2 border-neutral-300 w-full mt-5"></div>
              <h1 className="mt-2 ml-2 mr-2 text-neutral-500">or</h1>
              <div className="border-t-2 border-neutral-300 w-full mt-5"></div>
            </div>
            <button className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  setGoogleMail(decoded.email);
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

export default LoginPage;
