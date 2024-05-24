import SignupPage from "pages/SignupPage.jsx";
import LoginPage from "pages/LoginPage.jsx";
import MainPage from "pages/MainPage.jsx";
import BookOfficer from "pages/BookOfficer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookUproad from "pages/BookUproad";
import Emergency from "pages/Emergency";
import StudentInfo from "pages/StudentInfo";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Emergency" element={<Emergency/>}></Route>
        <Route path="/signUp" element={<SignupPage />}></Route>
        <Route path="/signin" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/bookOfficer" element={<BookOfficer />}></Route>
        <Route path="/bookUproad" element={<BookUproad />}></Route>
        <Route path="/StudentInfo" element={<StudentInfo/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
