import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "../Signup/Signup";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Main/>}></Route> */}
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
