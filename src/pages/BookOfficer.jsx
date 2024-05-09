import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import { useNavigate } from "react-router-dom";
// import "styles/BookOfficer.css";

const BookOfficer = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="bookOfficer">
      <img src={logo} alt="logo" className="logo" />
      <img src={bar} alt="bar" className="bar" />
      <img src={division} alt="divisionBar" className="divisionBar" />
      <div className="spanTag">
        <span
          className="SignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span className="LoginSpan" onClick={() => handleNavigation("/login")}>
          로그인
        </span>
        <span className="homeSpan" onClick={() => handleNavigation("/")}>
          홈
        </span>
        <span
          className="bookUproadSpan"
          onClick={() => handleNavigation("/bookUproad")}
        >
          도서/기기 등록
        </span>
        <span
          className="bookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서/기기 관리
        </span>
        <span
          className="studentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="contectSpan"
          onClick={() => handleNavigation("/contect")}
        >
          비상 연락처
        </span>
      </div>
    </div>
  );
};
export default BookOfficer;
