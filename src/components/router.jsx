import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "pages/SignupPage.jsx";
import LoginPage from "pages/LoginPage.jsx";
import MainPage from "pages/MainPage.jsx";
import BookOfficer from "pages/BookOfficer";
import Device from "pages/Device";
import Emergency from "pages/Emergency";
import StudentInfo from "pages/StudentInfo";
import Registration from "pages/Registration";
import BookEntry from "pages/BookEntry";
import EditBook from "pages/EditBook";
import EditDevice from "pages/EditDevice";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/emergency" element={<Emergency />}></Route>
        <Route path="/signUp" element={<SignupPage />}></Route>
        <Route path="/signin" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/bookOfficer" element={<BookOfficer />}></Route>
        <Route path="/device" element={<Device />}></Route>
        <Route path="/studentInfo" element={<StudentInfo />}></Route>
        <Route path="/deviceRegistration" element={<Registration />}></Route>
        <Route path="/bookEntry" element={<BookEntry />}></Route>
        <Route path="/editBook" element={<EditBook />}></Route>
        <Route path="/editDevice" element={<EditDevice />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
