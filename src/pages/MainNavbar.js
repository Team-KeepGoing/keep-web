import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import division from "assets/img/divisionBar.svg";
import "styles/MainNavbar.css";

const MainNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {user ? (
        <div>
          <p className="NavbarName">{user.name}님</p>
          <button onClick={handleLogout} className="NavbarLogout">
            로그아웃
          </button>
        </div>
      ) : (
        // 로그인되지 않은 경우
        <div>
          <img src={division} alt="divisionBar" className="NavdivisionBar" />
          <div className="NavspanTag">
            <span onClick={() => navigate("/signin")} className="NavLoginSpan">
              로그인
            </span>
            <span onClick={() => navigate("/signup")} className="NavSignupSpan">
              회원가입
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainNavbar;