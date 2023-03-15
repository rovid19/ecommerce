import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    axios.post("/api/auth/login-user", {
      name: username,
      password,
    });
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fl w-[80%] md:w-[50%] lg:w-[35%] 2xl:w-[20%]"
      >
        <h1 className="text-center text-5xl">Hello</h1>
        <p className="mt-1 text-center text-gray-400">
          If you don't have an account,{" "}
          <span className="font-bold">
            <Link to="/register">click here</Link>
          </span>
        </p>
        <form className="fl" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email, Username or Store Name"
            className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-4 p-2"
          />
          <input
            type="password"
            placeholder="password"
            className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-1 p-2"
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
        <button className="flex items-center relative mt-8 rounded-3xl border-gray-300 border-2  p-3 hover:bg-gray-300">
          <img
            className="h-8 absolute left-2"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
          ></img>{" "}
          <h1 className="h-full flex justify-center w-full">
            Continue with Google
          </h1>
        </button>
      </motion.div>
    </div>
  );
};

export default LoginPage;