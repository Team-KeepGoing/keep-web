import React, { useState } from "react";
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

  const handleLogin = async () => {
    setEmailError("");

    if (!email || !password) {
      setEmailError("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const response = await fetch("http://3.34.2.12:8080/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await response.json();
      console.log("Response from server:", result);
      if (result.TOKEN) {
        window.localStorage.setItem("TOKEN", result.TOKEN);
        navigate("/");
      } else {
        alert("로그인 실패!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("에러임요");
    }
  };
  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="Signinback">
      <img className="Signinbgimg" src={bgimg} alt="backgroundimage" /> {/* 로그인 뒷 우주배경사진 */}
      <img className="Signinbgimg2" src={bgimg2} alt="backgroundimage2" /> {/* 로그인 뒷 흰 배경 사진 */}
      <img className="Signinlogoimg" src={logoimg} alt="logoimg" /> {/*킵 로고 사진 */}
      <div className="SigninbrandName">KEEP</div> {/* 킵 */}
      <div>
        <label className="Signinemail">이메일</label> 
        <div className="SigninemailFormat">@dgsw.hs.kr 형식</div>
        <input
          id="email"
          className="SigninemailInputBox"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />{/*이메일 입력 */}
        {emailError && <p className="Signinerror-message">{emailError}</p>}
        <label className="Signinpassword">비밀번호</label>
        <input
          id="password"
          className="SigninpasswordInputBox"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {/*비밀번호 입력*/}
      </div>
      <button className="Signinbutton" onClick={handleLogin}>
        로그인
      </button>
      <div className="Signinnavigate" onClick={handleSignUp}>
        회원가입
      </div>
    </div>
  );
};

export default LoginPage;
