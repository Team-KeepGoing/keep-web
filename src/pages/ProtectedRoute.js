import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const SESSION_TIMEOUT = 10 * 60 * 1000; 

  const checkActivity = () => {
    if (user && user.lastActive) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - user.lastActive;

      if (elapsedTime > SESSION_TIMEOUT) {
        logout(); // 일정 시간이 지나면 로그아웃
      } else {
        const updatedUser = { ...user, lastActive: currentTime };
        // setUser(updatedUser); // 만약 state를 사용하여 직접 관리한다면 setState로
        localStorage.setItem("userData", JSON.stringify(updatedUser));
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(checkActivity, 5 * 60 * 1000); // 5분마다 활동 체크
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
