import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import logoimg from "assets/img/logo.svg";
import backward from "assets/img/backward.svg";
import "styles/SignupStyle.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isTeacher: false,
  });

  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubmit = async () => {
    setEmailError("");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@dgsw\.hs\.kr$/i;
    if (!emailRegex.test(formData.email)) {
      setEmailError("@dgsw.hs.kr 형식의 이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://15.165.16.79:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          teacher: formData.isTeacher.toString(),
        }),
      });

      const result = await response.json();
      if (result.message === "회원 가입이 완료 되었습니다!") {
        alert("회원가입 성공!");
        login({ name: formData.name, token: result.TOKEN });
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
            value={formData.name}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <label className="Signupemail">이메일</label>
          <div className="emailFormat">@dgsw.hs.kr 형식</div>
          <input
            id="email"
            className="SignupemailInputBox"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          {emailError && <p className="Signuperror-message">{emailError}</p>}
          <label className="Signuppassword">비밀번호</label>
          <input
            id="password"
            className="SignuppasswordInputBox"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <label htmlFor="isTeacher" className="Signupchecktext">
            교사인가요?
          </label>
          <input
            id="isTeacher"
            className="SignupcheckBox"
            type="checkbox"
            checked={formData.isTeacher}
            onChange={handleInputChange}
          />
        </div>
        <button className="Signupbutton" onClick={handleSubmit}>
          회원가입
        </button>
        <img
          className="backward"
          alt="뒤로가기 버튼"
          src={backward}
          onClick={() => handleNavigation("/")}
        />
        <span className="SignupgoBack" onClick={() => handleNavigation("/")}>
          뒤로가기
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
