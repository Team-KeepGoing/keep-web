import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import logoimg from "assets/img/logo.svg";
import backward from "assets/img/backward.svg";
import "styles/SignupStyle.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { login } = useContext(AuthContext);

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    setEmailError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@dgsw\.hs\.kr$/i;
    if (!emailRegex.test(email)) {
      setEmailError("@dgsw.hs.kr 형식의 이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://api.team-keepgoing.com:8080/user/signup", {
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
      });

      const result = await response.json();
      console.log(result);

      if (result.message === "회원 가입이 완료 되었습니다!") {
        alert("회원가입 성공!");
        login({ name, token: result.TOKEN });
        navigate("/signin");
      } else {
        alert("회원가입 실패!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("에러입니다!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="Signupbackground">
      <div>
        <div className="div"></div>
        <div className="SignupbrandName" onClick={() => handleNavigation("/")}>
          KEEP
        </div>
        <img src={logoimg} alt="keeplogo" className="Signuplogo" />
        <div className="input">
          <label className="SignupName">이름</label>
          <input
            className="SignupnameInputBox"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <label className="Signupemail">이메일</label>
          <div className="emailFormat">@dgsw.hs.kr 형식</div>
          <input
            id="email"
            className="SignupemailInputBox"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {emailError && <p className="Signuperror-message">{emailError}</p>}
          <label className="Signuppassword">비밀번호</label>
          <input
            id="password"
            className="SignuppasswordInputBox"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <label htmlFor="check" className="Signupchecktext">
            교사인가요?
          </label>
          <input
            id="check"
            className="SignupcheckBox"
            type="checkbox"
            checked={isTeacher}
            onChange={(e) => setIsTeacher(e.target.checked)}
          />
        </div>
        <button className="Signupbutton" onClick={handleSubmit}>
          회원가입
        </button>
        <img
          className="backward"
          alt="뒤로가기 버튼"
          src={backward}
          onClick={handleBack}
        />
        <span className="SignupgoBack" onClick={handleBack}>
          뒤로가기
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
