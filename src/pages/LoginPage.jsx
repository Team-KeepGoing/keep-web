import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgimg from "assets/img/universe2.svg";
import bgimg2 from "assets/img/Rectangle 23background2.svg";
import logoimg from "assets/img/Guideslogo.svg";
import "styles/LoginStyle.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleSubmit = () => {
    setEmailError("");
    setPasswordError("");

    // 이메일 형식 체크
    if (!email.includes("@")) {
      setEmailError("올바른 이메일 형식을 입력하세요.");
    }

    // 비밀번호 체크 (임시로 설정)
    // if (password !== "서버쪽 비밀번호") {
    //   setPasswordError("비밀번호가 일치하지 않습니다.");
    // }

    if (!emailError && !passwordError) {
      console.log("Email:", email);
      console.log("Password:", password);
      // 여기서 실제 로그인 API 호출 등의 로직을 수행합니다.
    }
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
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      <button className="button" onClick={handleSubmit}>
        로그인
      </button>
      <div className="navigate" onClick={handleSignUp}>
        비밀번호 찾기 | 회원가입
      </div>
    </div>
  );
};

export default LoginPage;
