import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
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
import { AuthContext } from "pages/AuthContext";
import ViewBook from "pages/ViewBook";
import ViewDevice from "pages/ViewDevice";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      navigate("/signin");
    }
  }, [user, navigate]);

  return user ? element : null;
};
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/bookOfficer" element={<BookOfficer />} />
        <Route path="/device" element={<Device />} />
        <Route path="/studentInfo" element={<StudentInfo />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/deviceRegistration" element={<Registration />} />
        <Route path="/bookEntry" element={<BookEntry />} />
        <Route path="/editBook" element={<EditBook />} />
        <Route path="/editDevice" element={<EditDevice />} />
        <Route path="/viewBook" element={<ViewBook />} />
        <Route path="/viewDevice" element={<ViewDevice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
