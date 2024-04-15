import React from "react";
import { useNavigate } from "react-router-dom"; // useHistory 추가
import bar from "assets/img/bar.svg";
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
      <img src={bar} alt="bar" />
      <button className="buttonBar" onClick={handleSignUp}>
        회원가입
      </button>
      <button className="buttonBar" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
};

export default MainPage;
