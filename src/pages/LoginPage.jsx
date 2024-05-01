import React, { useState, useEffect } from "react";
import axios from "axios";
import bgimg from "assets/img/universe2.svg";
import bgimg2 from "assets/img/Rectangle 23background2.svg";
import logoimg from "assets/img/Guideslogo.svg";
import { useNavigate } from "react-router-dom";
import "styles/LoginStyle.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState([]);

  const handleSignUp = () => {
    navigate("/signup");
  }
  const handleSubmit = () => {
    setEmailError("");
    console.log("Email:", email);
    console.log("Password:", password);
  };
  useEffect(() => {
    const apiUrl =
      "http://52.79.143.148:8080/swagger-ui/index.html#/%EC%9C%A0%EC%A0%80/registerAndAuthenticateUser";
    const endpoint = "/signup";
    axios
      .get(apiUrl + endpoint)
      .then((res) => {
        setSignIn(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);
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
      <div className="navigate" onClick={handleSignUp}>
        비밀번호 찾기 | 회원가입
      </div>
      {/* 일단은 뷰만. 이후에 navigate 사용하기 */}
    </div>
  );
};
export default LoginPage;
