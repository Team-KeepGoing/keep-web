import React, { useState } from "react";
import bgimg from "../assets/img/universe.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = () => {
    setEmailError("");
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div className="back">
      <img className="bgimg" src={bgimg} alt="backgroundimage" />
      <div className="brandName">KEEP</div>
      <div>
        <label id="ema">이메일</label>
        <input
          id="email"
          className="inputbox"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <label id="pass">패스워드</label>
        <input
          id="password"
          className="inputbox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleSubmit}>
        확인
      </button>
    </div>
  );
};
export default LoginPage;
