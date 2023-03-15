import React from "react";
import { useDispatch } from "react-redux";
import { addInput } from "../../app/features/registrationInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fl w-[80%] md:w-[50%] lg:w-[35%] 2xl:w-[20%] "
      >
        <h1 className="text-center text-5xl">You're looking to...</h1>
        <p className="text-center text-gray-300 mt-2">
          Please choose one of the following
        </p>
        <div className="flex mt-6 justify-center ">
          <button
            onClick={() => {
              dispatch(addInput("Customer"));
              navigate("/register/form");
            }}
            className="h-[50°%] w-[40%] border-2 border-gray-300 rounded-3xl p-4 hover:bg-orange hover:text-white hover:border-none"
          >
            Buy
          </button>

          <h1 className="mt-4 ml-4 mr-4 ">Or</h1>
          <button
            onClick={() => {
              dispatch(addInput("Store Owner"));
              navigate("/register/form");
            }}
            className="h-[50°%] w-[40%] border-2 border-gray-300 rounded-3xl p-4 hover:bg-orange hover:text-white hover:border-none"
          >
            Sell{" "}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
