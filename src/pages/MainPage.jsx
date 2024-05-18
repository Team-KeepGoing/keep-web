import React from "react";
import { useNavigate } from "react-router-dom";
import bar from "assets/img/bar.svg";
import logo from "assets/img/Guideslogo.svg";
import dongrami from "assets/img/Ellipse.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import "styles/MainStyle.css";

const MainPage = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="Mainbackground">
      <img src={logo} alt="logo" className="Mainlogo" />
      <div className="Maineep">EEP</div>
      <img src={bar} alt="bar" className="Mainbar" />
      <img src={buttonBack} alt="buttonBack" className="MainbuttonBack" />
      <img src={division} alt="divisionBar" className="MaindivisionBar" />
      <div className="MainspanTag">
        <span
          className="MainSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="MainLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        <span className="MainhomeSpan" onClick={() => handleNavigation("/")}>
          홈
        </span>
        <span
          className="MainbookUproadSpan"
          onClick={() => handleNavigation("/bookUproad")}
        >
          도서/기기 등록
        </span>
        <span
          className="MainbookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서/기기 관리
        </span>
        <span
          className="MainstudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="MaincontectSpan"
          onClick={() => handleNavigation("/contect")}
        >
          비상 연락처
        </span>
      </div>
      <h2>맞춤서비</h2>
      <div className="Maintext">
        KEEP이 제공하는 맞춤 서비스를 한눈에 확인하세요
      </div>
      <button className="Mainqkfhrkrl"></button>
      <img src={dongrami} alt="동그라미" className="Maindongrami1"></img>
      <p className="Maintext1">손쉽게 학생 정보를 확인하세요.</p>
      <button className="Mainqkfhrkrl2"></button>
      <img src={dongrami} alt="동그라미" className="Maindongrami2"></img>
      <p className="Maintext2">
        도서/기기 목록 및 실시간
        <br />
        대여 현황을 알 수 있습니다.
      </p>
      <button className="Mainqkfhrkrl3"></button>
      <img src={dongrami} alt="동그라미" className="Maindongrami3"></img>
      <p className="Maintext3">
        도서/기기 정보를 추가합니다.
      </p>
    </div>
  );
};
/*
메인페이지 뷰 전체 다시 수정 진행
 */
export default MainPage;
