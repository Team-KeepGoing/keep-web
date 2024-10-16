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
import Declaration from "pages/Declaration";
import { AuthContext } from "pages/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User state:", user);
    if (!user) {
      navigate("/");
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
        <Route
          path="/bookOfficer"
          element={<PrivateRoute element={<BookOfficer />} />}
        />
        <Route path="/device" element={<PrivateRoute element={<Device />} />} />
        <Route
          path="/studentInfo"
          element={<PrivateRoute element={<StudentInfo />} />}
        />
        <Route
          path="/emergency"
          element={<PrivateRoute element={<Emergency />} />}
        />
        <Route
          path="/deviceRegistration"
          element={<PrivateRoute element={<Registration />} />}
        />
        <Route
          path="/declaration"
          element={<PrivateRoute element={<Declaration />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
