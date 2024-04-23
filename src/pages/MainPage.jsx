import React from "react";
import { useNavigate } from "react-router-dom";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import "styles/MainStyle.css";

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
      <img src={bar} alt="bar" className="bar" />
      <img src={division} alt="divisionBar" className="divisionBar" />
      <div className="spanTag">
        <span className="SignupSpan" onClick={handleSignUp}>
          회원가입
        </span>
        <span className="LoginSpan" onClick={handleLogin}>
          로그인
        </span>
      </div>
      <h2>맞춤 서비스</h2>
      <div className="text">KEEP이 제공하는 맞춤 서비스를 한눈에 확인하세요</div>
    </div>
  );
};

export default MainPage;
