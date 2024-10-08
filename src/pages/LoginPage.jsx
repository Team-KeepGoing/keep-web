import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import logoimg from "assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import config from "../config/config.json";
import "styles/LoginStyle.css";
import Input from "../components/login/Input";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    setEmailError("");
    const { email, password } = credentials;

    if (!email || !password) {
      setEmailError("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const response = await fetch(`${config.serverurl}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Response from server:", result);

      if (result.token) {
        login({
          email: result.email,
          id: result.id,
          name: result.name,
          teacher: result.teacher,
          token: result.token,
          type: result.type,
        });
        navigate("/");
        alert("로그인 성공!");
      } else {
        alert("로그인 실패!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 에러입니다. 죄송합니다.");
    }
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
      <div className="SigninbrandName" onClick={() => navigate("/")}>
        KEEP
      </div>
      <div>
        <Input
          id="email"
          label="이메일"
          type="email"
          value={credentials.email}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          error={emailError}
        />
        <Input
          id="password"
          label="비밀번호"
          type="password"
          value={credentials.password}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
      </div>
      <button className="Signinbutton" onClick={handleLogin}>
        로그인
      </button>
      <div className="Signinnavigate" onClick={() => navigate("/signup")}>
        비밀번호 찾기 | 회원가입
      </div>
    </div>
  );
};

export default LoginPage;
