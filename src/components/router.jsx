import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "/Users/sojin/Desktop/리액트/keep-web/src/Signup/SignUp.jsx";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
