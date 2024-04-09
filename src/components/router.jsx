import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Login/LoginPage.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
// {/* <Route path="/SignUp" element={<Signup />}></Route> */}
// import Signup from "../src/Signup/Signup.jsx";
