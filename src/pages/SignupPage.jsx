import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgimg from "assets/img/universe2.svg";
import bgimg2 from "assets/img/Rectangle 23background2.svg";
import logoimg from "assets/img/Guideslogo.svg";
import "styles/SignupStyle.css";

const SignupPage = () => {
  // const { emailValue, pwValue, nameValue, teacherValue } = this.state;
  fetch(
    "http://52.79.143.148:8080/swagger-ui/index.html#/%EC%9C%A0%EC%A0%80/fixUserData/user/signup",
    {
      method: "POST",
      body: JSON.stringify({
        email: "string",
        password: "string",
        name: "string",
        teacher: true,
      }),
    }
  )
    .then((response) => response.json())
    .then((result) => {
      result.message === "SUCCESS"
        ? alert("회원가입 성공")
        : alert("회원가입 실패");
    });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  // const validateEmail = (email) => {
  //   const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  //   return emailRegex.test(email);
  // };

  const handleSubmit = () => {
    setEmailError("");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Is Teacher:", isTeacher);
  };

  return (
    <div className="background">
      <div>
        <div className="div"></div>
        <div>
          {/* {signUp.map(signup => (

          ))} */}
          <img className="bgimg" src={bgimg} alt="backgroundimage" />
          <img className="bgimg2" src={bgimg2} alt="backgroundimage2" />
        </div>
        <div className="brandName">KEEP</div>
        <img src={logoimg} alt="keeplogo" className="logo" />
        <div className="input">
          <label className="name">이름</label>
          <input
            className="nameInputBox"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="email">이메일</label>
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
          <label className="checktext">교사인가요?</label>
          <input
            className="checkBox"
            type="checkbox"
            checked={isTeacher}
            onChange={(e) => setIsTeacher(e.target.checked)}
          />
        </div>
        <button className="button" onClick={handleSubmit}>
          확인
        </button>
        <span className="goBack" onClick={handleBack}>
          &lt; 뒤로가기
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
