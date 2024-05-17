import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgimg from "assets/img/universe2.svg";
import bgimg2 from "assets/img/Rectangle 23background2.svg";
import logoimg from "assets/img/Guideslogo.svg";
import "styles/SignupStyle.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    setEmailError("");

    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일을 입력해주세요.");
      return;
    }

    fetch("http://3.34.2.12:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        teacher: isTeacher ? "true" : "false",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "SUCCESS") {
          alert("회원가입 성공");
          navigate("/signin");
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("회원가입 실패");
      });
  };

  return (
    <div className="Signupbackground">
      <div>
        <div className="div"></div>
        <div>
          <img className="Signupbgimg" src={bgimg} alt="backgroundimage" />
          <img className="Signupbgimg2" src={bgimg2} alt="backgroundimage2" />
        </div>
        <div className="SignupbrandName">KEEP</div>
        <img src={logoimg} alt="keeplogo" className="Signuplogo" />
        <div className="input">
          <label className="Signupname">이름</label>
          <input
            className="SignupnameInputBox"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="Signupemail">이메일</label>
          <input
            id="email"
            className="SignupemailInputBox"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="Signuperror-message">{emailError}</p>}
          <label className="Signuppassword">비밀번호</label>
          <input
            id="password"
            className="SignuppasswordInputBox"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="Signupchecktext">교사인가요?</label>
          <input
            className="SignupcheckBox"
            type="checkbox"
            checked={isTeacher}
            onChange={(e) => setIsTeacher(e.target.checked)}
          />
        </div>
        <button className="Signupbutton" onClick={handleSubmit}>
          확인
        </button>
        <span className="SignupgoBack" onClick={handleBack}>
          &lt; 뒤로가기
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
