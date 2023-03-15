import React from "react";
import Navbar from "./components/Navbar/Navbar.js";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Register/RegisterPage";
import RegisterPagePartTwo from "./components/Register/RegisterPagePartTwo.js";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {" "}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/form" element={<RegisterPagePartTwo />} />
      </Routes>
    </div>
  );
};

export default App;
