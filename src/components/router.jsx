import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Signup from "../Signup/Signup";
import LoginPage from "../Login/LoginPage";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/signUp" element={<Signup />}></Route> */}
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
