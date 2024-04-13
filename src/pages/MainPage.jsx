import React from "react";
import { useNavigate } from "react-router-dom";
import bar from "assets/img/bar.svg";
import "styles/MainStyle.css";

const MainPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate.push("src/pages/SignupPage.jsx");
  };

  const handleLogin = () => {
    navigate.push("src/pages/LoginPage.jsx");
  };

  return (
    <div className="background">
      <button className="buttonBar" onClick={handleSignUp}>
        <img src={bar} alt="button bar" />
      </button>
      <button className="buttonBar" onClick={handleLogin}>
        <img src={bar} alt="button bar" />
      </button>
    </div>
  );
};

export default MainPage;
