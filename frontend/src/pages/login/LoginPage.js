import React from "react";

const LoginPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="fl w-[20%]">
        <h1 className="text-center text-5xl">Hello</h1>
        <p className="mt-1 text-center">
          If you don't have an account, click here
        </p>
        <input
          placeholder="Email or username"
          className="border-2 border-gray-300 border-opacity-25 rounded-xl mt-4 p-2"
        />
        <button className="mt-4 bg-gray-300 text-white rounded-2xl p-3">
          continue
        </button>
        <div className="flex mt-4 relative">
          <div className="border-t-2 border-gray-300 w-full mt-5 "></div>
          <h1 className="mt-2 ml-2 mr-2 text-gray-500">or</h1>
          <div className="border-t-2 border-gray-300 w-full mt-5 "></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
