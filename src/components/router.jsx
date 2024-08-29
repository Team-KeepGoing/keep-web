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
// import ViewBook from "pages/ViewBook";
import ViewDevice from "pages/ViewDevice";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
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
          path="/bookEntry"
          element={<PrivateRoute element={<BookEntry />} />}
        />
        <Route
          path="/editBook"
          element={<PrivateRoute element={<EditBook />} />}
        />
        <Route
          path="/editDevice"
          element={<PrivateRoute element={<EditDevice />} />}
        />
        {/* <Route
          path="/viewBook"
          element={<PrivateRoute element={<ViewBook />} />}
        /> */}
        <Route
          path="/viewDevice"
          element={<PrivateRoute element={<ViewDevice />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
