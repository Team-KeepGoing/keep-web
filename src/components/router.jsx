import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../Signup/Signup";

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
