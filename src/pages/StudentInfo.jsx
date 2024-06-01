import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import division from "../assets/img/divisionBar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "../styles/StudentInfo.css";

const StudentInfo = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="StudentInfo">
      <img src={logo} alt="logoimage" className="StudentInfologo" />
      <div className="StudentInfoeep">EEP</div>
      <div className="StudentInfoment">학생 정보 입력</div>
      <img
        src={buttonBack}
        alt="buttonBack"
        className="StudentInfobuttonBack"
      />
      <div className="StudentInfoment2">학생들의 기본 정보를 등록해주세요.</div>
      <img src={bar} alt="bar" className="StudentInfobar" />
      <img
        src={division}
        alt="divisionBar"
        className="StudentInfodivisionBar"
      />
      <div className="StudentInfospanTag">
        <span
          className="StudentInfoSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="StudentInfoLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        <span
          className="StudentInfohomeSpan"
          onClick={() => handleNavigation("/")}
        >
          홈
        </span>
        <span
          className="StudentInfobookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서 관리
        </span>
        <span
          className="StudentInfoDeviceSpan"
          onClick={() => handleNavigation("/Device")}
        >
          기기 관리
        </span>
        <span
          className="studentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="StudentInfoEmergencySpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
      </div>
      <div className="overlap-group">
        <div className="rectangle" />
        <p className="div">
          <span className="text-wrapper">파일을 드래그 또는 </span>
          <span className="span">업로드</span>
          <span className="text-wrapper"> 해주세요</span>
        </p>
        <div className="text-wrapper-2">내 기기에서</div>
        <img className="element" alt="Element" src="2024-04-10-7-54-2.png" />
        <img className="line" alt="Line" src="line-2.svg" />
        <img className="img" alt="Line" src="line-3.svg" />
        <div className="rectangle-2" />
        <div className="text-wrapper-3">찾아보기</div>
        <div className="text-wrapper-4">OR</div>
      </div>
    </div>
  );
};

export default StudentInfo;
