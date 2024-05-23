import SignupPage from "pages/SignupPage.jsx";
import LoginPage from "pages/LoginPage.jsx";
import MainPage from "pages/MainPage.jsx";
import BookOfficer from "pages/BookOfficer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookUproad from "pages/BookUproad";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<SignupPage />}></Route>
        <Route path="/signin" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/bookOfficer" element={<BookOfficer />}></Route>
        <Route path="/bookUproad" element={<BookUproad />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;