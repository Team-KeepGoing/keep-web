import React from "react";
import { useNavigate } from "react-router-dom";
import bar from "assets/img/bar.svg";
import logo from "assets/img/Guideslogo.svg";
import dongrami from "assets/img/Ellipse.svg";
import division from "assets/img/divisionBar.svg";
import "styles/MainStyle.css";

const MainPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleBookUproad = () => {
    navigate("/bookUproad");
  };
  const handleBookOfficer = () => {
    navigate("/bookOfficer");
  };
  const handleStudentInfo = () => {
    navigate("/studentInfo");
  };
  const handleContect = () => {
    navigate("/contect");
  };

  return (
    <div className="background">
      <img src={logo} alt="logo" className="logo" />
      <img src={bar} alt="bar" className="bar" />
      <img src={division} alt="divisionBar" className="divisionBar" />
      <div className="spanTag">
        <span className="SignupSpan" onClick={handleSignUp}>
          회원가입
        </span>
        <span className="LoginSpan" onClick={handleLogin}>
          로그인
        </span>
        <span className="homeSpan" onClick={handleHome}>
          홈
        </span>
        <span className="bookUproadSpan" onClick={handleBookUproad}>
          도서/기기 등록
        </span>
        <span className="bookOfficerSpan" onClick={handleBookOfficer}>
          도서/기기 관리
        </span>
        <span className="studentInfoSpan" onClick={handleStudentInfo}>
          학생 정보 입력
        </span>
        <span className="contectSpan" onClick={handleContect}>
          비상 연락처
        </span>
      </div>
      <h2>맞춤 서비스</h2>
      <div className="text">
        KEEP이 제공하는 맞춤 서비스를 한눈에 확인하세요
      </div>
      <button className="qkfhrkrl"></button>
      <img src={dongrami} alt="동그라미" className="dongrami1"></img>
      <p className="text1">손쉽게 학생 정보를 확인하세요.</p>
      <button className="qkfhrkrl2"></button>
      <img src={dongrami} alt="동그라미" className="dongrami2"></img>
      <p className="text2">
        도서/기기 목록 및 실시간
        <br />
        대여 현황을 알 수 있습니다.
      </p>
      <button className="qkfhrkrl3"></button>
      <img src={dongrami} alt="동그라미" className="dongrami3"></img>
      <p className="text3">
        학생 정보 및 도서/기기
        <br />
        정보를 추가합니다.
      </p>
    </div>
  );
};

export default MainPage;
