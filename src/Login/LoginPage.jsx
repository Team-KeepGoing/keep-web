import React, { useState } from "react";
import bgimg from "../assets/img/universe.svg";
import bgimg2 from "../assets/img/Rectangle 23background2.svg";
import logoimg from "../assets/img/Guideslogo.svg";
import "../Login/LoginStyle.css";

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
      <img className="bgimg2" src={bgimg2} alt="backgroundimage2" />
      <img className="logoimg" src={logoimg} alt="logoimg" />
      <div className="brandName">KEEP</div>
      <div>
        <label className="email">이메일</label>
        <div className="emailFormat">@dgsw.hs.kr 형식</div>
        <input
          id="email"
          className="emailInputBox"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error-message">{emailError}</p>}
        <label className="password">비밀번호</label>
        <input
          id="password"
          className="passwordInputBox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleSubmit}>
        로그인
      </button>
      <div className="navigate">비밀번호 찾기 | 회원가입</div>
      {/* 일단은 뷰만. 이후에 navigate 사용하기 */}
    </div>
  );
};
export default LoginPage;
