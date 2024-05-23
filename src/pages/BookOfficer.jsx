import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/BookOfficer.css";

const BookOfficer = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="BookOfficerbookOfficer">
      <img src={logo} alt="logo" className="BookOfficerlogo" />
      <div className="BookOfficereep">EEP</div>
      <div className="BookOfficerment">도서 관리하기</div>
      <img
        src={buttonBack}
        alt="buttonBack"
        className="BookOfficerbuttonBack"
      />
      <div className="BookOfficerment2">도서 관리를 더욱 쉽게 도와줍니다.</div>
      <img src={bar} alt="bar" className="BookOfficerbar" />
      <img
        src={division}
        alt="divisionBar"
        className="BookOfficerdivisionBar"
      />
      <div className="BookOfficerspanTag">
        <span
          className="BookOfficerSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="BookOfficerLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        <span
          className="BookOfficerhomeSpan"
          onClick={() => handleNavigation("/")}
        >
          홈
        </span>
        <span
          className="BookOfficerDeviceSpan"
          onClick={() => handleNavigation("/Device")}
        >
          도서 관리
        </span>
        <span
          className="BookOfficerbookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          기기 관리
        </span>
        <span
          className="BookOfficerstudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="BookOfficercontectSpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
      </div>
    </div>
  );
};
export default BookOfficer;
