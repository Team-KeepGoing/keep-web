import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
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
          className="BookOfficerbookUproadSpan"
          onClick={() => handleNavigation("/bookUproad")}
        >
          도서/기기 등록
        </span>
        <span
          className="BookOfficerbookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서/기기 관리
        </span>
        <span
          className="BookOfficerstudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="BookOfficercontectSpan"
          onClick={() => handleNavigation("/contect")}
        >
          비상 연락처
        </span>
      </div>
    </div>
  );
};
export default BookOfficer;
