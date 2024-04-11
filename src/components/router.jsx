import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../Signup/SignupPage";
import LoginPage from "../Login/LoginPage";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
