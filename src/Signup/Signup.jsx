import React, { useState } from "react";
import "src/Signup/SignupStyle.css";
import bgimg from "src/assets/img/universe.svg";
import logo from "src/assets/img/Guideslogo.svg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [emailError, setEmailError] = useState("");

  //   const validateEmail = (email) => {
  //     const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  //     return emailRegex.test(email);
  //   };

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
          <img className="bgimg" src={bgimg} alt="backgroundimage" />
        </div>
        <div className="brandName">KEEP</div>
        <img src={logo} alt="keeplogo" className="logo" />
        <div className="input">
          <label id="nm">이름</label>
          <input
            className="inputbox"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <label className="checktext">교사인가요?</label>
          <input
            className="checkbox"
            type="checkbox"
            checked={isTeacher}
            onChange={(e) => setIsTeacher(e.target.checked)}
          />
        </div>
        <button className="button" onClick={handleSubmit}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SignUp;
