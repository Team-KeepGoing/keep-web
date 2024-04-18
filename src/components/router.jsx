import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "pages/LoginPage.jsx";
import SignupPage from "pages/SignupPage";
import MainPage from "pages/MainPage";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
