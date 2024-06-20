import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { useContext } from "react";
import { AuthContext } from "pages/AuthContext";
import ViewBook from "pages/ViewBook";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user ? element : <Navigate to="/signin" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/signin" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route
          path="/bookOfficer"
          element={<PrivateRoute element={<BookOfficer />} />}
        ></Route>
        <Route
          path="/device"
          element={<PrivateRoute element={<Device />} />}
        ></Route>
        <Route
          path="/studentInfo"
          element={<PrivateRoute element={<StudentInfo />} />}
        ></Route>
        <Route
          path="/emergency"
          element={<PrivateRoute element={<Emergency />} />}
        ></Route>
        <Route
          path="/deviceRegistration"
          element={<PrivateRoute element={<Registration />} />}
        ></Route>
        <Route
          path="/bookEntry"
          element={<PrivateRoute element={<BookEntry />} />}
        ></Route>
        <Route
          path="/editBook"
          element={<PrivateRoute element={<EditBook />} />}
        ></Route>
        <Route
          path="/editDevice"
          element={<PrivateRoute element={<EditDevice />} />}
        ></Route>
        <Route
          path="/viewBook"
          element={<PrivateRoute element={<ViewBook />} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
