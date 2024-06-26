import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "pages/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext);

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/signin" replace />
  );
};
