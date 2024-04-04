import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../Signup/Signup";
import LogIn from "../Login/LoginPage";

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
