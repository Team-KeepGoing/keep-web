import BookOfficer from "pages/BookOfficer";
import LoginPage from "pages/LoginPage";
import MainPage from "pages/MainPage";
import SignupPage from "pages/SignupPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/bookOfficer" element={<BookOfficer />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
