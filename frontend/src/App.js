import React from "react";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {" "}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
