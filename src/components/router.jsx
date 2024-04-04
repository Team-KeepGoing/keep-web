import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "src/Signup/Signup.jsx";
import LogIn from "src/Login/LoginPage.jsx";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/LogIn" element={<LogIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
