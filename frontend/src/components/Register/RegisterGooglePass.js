import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserDva,
  fetchStoreProducts,
  fetchUserData,
} from "../../app/features/User/userSlice";
import axios from "axios";

const LoginGooglePass = ({ email }) => {
  const [password, setPassword] = useState(null);
  const [confirmedPass, setConfirmedPass] = useState(null);

  const [name, setName] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const input = useSelector((state) => state.registrationInput.value);
  async function handleRegister(e) {
    if (password === confirmedPass) {
      if ((email, name, password)) {
        try {
          e.preventDefault();
          await axios.post("/api/auth/register-user", {
            dynamicName: name,
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
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="w-full h-full flex items-center justify-center"
    >
      <form className="h-full w-full  fl" onSubmit={handleRegister}>
        {error && (
          <h1 className="text-red-500 mt-2 font-bold text-center">{error}</h1>
        )}
        <h1 className="text-center text-base">Dear, {email}.</h1>
        <h1 className="text-center text-gray-500">
          Please enter your store name and password to continue
        </h1>{" "}
        <input
          type="text"
          placeholder={input === "Store Owner" ? "Store name" : "Username"}
          className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-4 p-2"
          onChange={(e) => setName(e.target.value)}
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
        <button className="mt-4 bg-gray-300 text-white rounded-2xl p-3 hover:bg-orange-500 transition-all">
          continue
        </button>
      </form>
    </motion.div>
  );
};

export default LoginGooglePass;
