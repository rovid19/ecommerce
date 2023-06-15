import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { switchValue } from "../../app/features/getUserTrigger";
import {
  addUserDva,
  fetchStoreProducts,
  fetchUserData,
} from "../../app/features/User/userSlice";
import LoginGooglePass from "./LoginGooglePass";

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [googlePass, setGooglePass] = useState(false);
  const [googleMail, setGoogleMail] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.userData.value.user);
  const getUserTrigger = useSelector((state) => state.getUserTrigger.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    axios
      .post("/api/auth/login-user", {
        email,
        password,
      })
      .then(() => {
        dispatch(fetchUserData());
        dispatch(fetchStoreProducts());

        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError("Incorrect email or password");
        }
      });
  }
  console.log(googlePass);
  return (
    <div className="h-screen flex justify-center items-center">
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
            <h1 className="text-center text-5xl">Hello</h1>
            <p className="mt-1 text-center text-gray-400">
              If you don't have an account,{" "}
              <span className="font-bold">
                <Link to="/register">click here</Link>
              </span>
            </p>
            <form className="fl" onSubmit={handleLogin}>
              {error && (
                <h1 className="text-red-500 mt-2 font-bold text-center">
                  {error}
                </h1>
              )}
              <input
                type="text"
                placeholder="Email"
                className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-4 p-2"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-1 p-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="mt-4 bg-gray-300 text-white rounded-2xl p-3">
                continue
              </button>{" "}
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
                  console.log(decoded);
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
