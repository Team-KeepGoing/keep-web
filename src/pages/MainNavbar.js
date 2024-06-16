import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider"; 
import { useNavigate } from "react-router-dom";
import division from "../assets/img/divisionBar.svg";
import "../styles/MainNavbar.css";

const MainNavbar = () => {
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div>
      {user ? (
        // 로그인된 경우
        <div>
          <p className="NavbarName">{user.name} 님</p>
          <span onClick={handleLogout} className="NavbarLogout">
            로그아웃
          </span>
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
