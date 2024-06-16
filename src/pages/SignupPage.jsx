import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
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
      const response = await fetch("http://3.34.2.12:8080/user/signup", {
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
        // 이름을 포함하여 AuthContext에 저장
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
            onKeyDown={handleKeyPress}
          />
          <label className="Signupemail">이메일</label>
          <div className="SignupemailFormat">@dgsw.hs.kr 형식</div>
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
