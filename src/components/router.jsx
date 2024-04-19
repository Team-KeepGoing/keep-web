import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
