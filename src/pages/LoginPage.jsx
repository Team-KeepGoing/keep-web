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

  const handleLogin = () => {
    // 이메일과 비밀번호의 유효성 검사
    if (!email || !password) {
      setEmailError("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }

    // 서버로 로그인 요청 보내기
    fetch(
      "http://52.79.143.148:8080/swagger-ui/index.html#/%EC%9C%A0%EC%A0%80/fixUserData/user/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("로그인 실패!");
        }
        return response.json();
      })
      .then((result) => {
        localStorage.setItem("TOKEN", result.TOKEN);
        navigate("/main"); // 페이지 이동
      })
      .catch((error) => {
        console.error("Error:", error);
        setEmailError("로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
      });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

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
      <button className="button" onClick={handleLogin}>
        로그인
      </button>
      <div className="navigate" onClick={handleSignUp}>
        비밀번호 찾기 | 회원가입
      </div>
    </div>
  );
};

export default LoginPage;
