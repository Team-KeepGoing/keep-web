import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import logoimg from "assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import "styles/LoginStyle.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogin = async () => {
    setEmailError("");

    if (!email || !password) {
      setEmailError("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const response = await fetch("http://15.165.16.79:8080/user/signin", {
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
      if (result.token) {
        const userData = {
          email: result.email,
          id: result.id,
          name: result.name,
          teacher: result.teacher,
          token: result.token,
          type: result.type,
        };
        login(userData);
        navigate("/");
        alert("로그인 성공!");
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
      <div className="div"></div>
      <img src={logoimg} alt="keeplogo" className="Signinlogoimg" />
      <div className="SigninbrandName" onClick={() => handleNavigation("/")}>
        KEEP
      </div>
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
        />
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
      </div>
      <button className="Signinbutton" onClick={handleLogin}>
        로그인
      </button>
      <div className="Signinnavigate" onClick={handleSignUp}>
        비밀번호 찾기 | 회원가입
      </div>
    </div>
  );
};

export default LoginPage;
