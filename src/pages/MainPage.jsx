import React from "react";
import { useNavigate } from "react-router-dom";
import bar from "assets/img/bar.svg";
import "styles/MainStyle.css";
/** 상태관리 jotai 사용*/

const MainPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup"); 
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="background">
      <img src={bar} alt="bar" />
      <div className="spanTag">
        <span className="SignupSpan" onClick={handleSignUp}>
          회원가입
        </span>
        <span className="LoginSpan" onClick={handleLogin}>
          로그인
        </span>
      </div>
    </div>
  );
};

export default MainPage;
