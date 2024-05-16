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

        // 서버에 로그인 요청을 보냅니다.
        fetch("http://3.34.2.12:8080/user/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.message === "SUCCESS") {
                    alert("로그인 성공");
                    // 성공 시 메인 페이지로 이동
                    navigate("/");
                } else {
                    alert("로그인 실패");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("로그인 실패");
            });
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
            <img className="Signinbgimg" src={bgimg} alt="backgroundimage" />
            <img className="Signinbgimg2" src={bgimg2} alt="backgroundimage2" />
            <img className="Signinlogoimg" src={logoimg} alt="logoimg" />
            <div className="SigninbrandName">KEEP</div>
            <div>
                <label className="Signinemail">이메일</label>
                <div className="SigninemailFormat">@dgsw.hs.kr 형식</div>
                <input
                    id="email"
                    className="SigninemailInputBox"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                {emailError && <p className="Signinerror-message">{emailError}</p>}
                <label className="Signinpassword">비밀번호</label>
                <input
                    id="password"
                    className="SigninpasswordInputBox"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
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
