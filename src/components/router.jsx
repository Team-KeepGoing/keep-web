import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Signup from "../src/Signup/Signup.jsx";
import LoginPage from "../Login/LoginPage";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/SignUp" element={<Signup />}></Route> */}
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
