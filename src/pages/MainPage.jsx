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
  // 네비게이션 연결 함수처리
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="Mainbackground">
      <img src={logo} alt="logo" className="Mainlogo" /> {/*킵 로고 사진 */}
      <div className="Maineep">EEP</div> {/*킵 로고 */}
      <img src={bar} alt="bar" className="Mainbar" />{" "}
      {/*네비게이션 모음 아래 배경 사진 */}
      <img src={buttonBack} alt="buttonBack" className="MainbuttonBack" />{" "}
      {/* 홈화면의 네비게이션 버튼 뒷 배경 */}
      <img src={division} alt="divisionBar" className="MaindivisionBar" />{" "}
      {/*회원가입, 로그인 구분선 사진 */}
      <div className="MainspanTag">
        {/*회원가입으로 이동 */}
        <span
          className="MainSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        {/*로그인으로 이동 */}
        <span
          className="MainLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        {/*홈으로 이동 */}
        <span className="MainhomeSpan" onClick={() => handleNavigation("/")}>
          홈
        </span>
        {/*도서/기기 등록으로 이동 */}
        <span
          className="MainbookUproadSpan"
          onClick={() => handleNavigation("/bookUproad")}
        >
          도서/기기 등록
        </span>
        {/*도서/기기 관리로 이동 */}
        <span
          className="MainbookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서/기기 관리
        </span>
        {/*학생 정보 등록으로 이동 */}
        <span
          className="MainstudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        {/*비상 연락처로 이동 */}
        <span
          className="MaincontectSpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
      </div>
      {/*메인 멘트 */}
      <h2>맞춤서비스</h2>
      <div className="Maintext">
        KEEP이 제공하는 맞춤 서비스를 한눈에 확인하세요
      </div>
      <button className="Mainqkfhrkrl"></button>
      {/*메인 바로가기 버튼1 */}
      <img src={dongrami} alt="동그라미" className="Maindongrami1"></img>
      <p className="Maintext1">손쉽게 학생 정보를 확인하세요.</p>
      <button className="Mainqkfhrkrl2"></button> {/*메인 바로가기 버튼2 */}
      <img src={dongrami} alt="동그라미" className="Maindongrami2"></img>
      <p className="Maintext2">
        도서/기기 목록 및 실시간
        <br />
        대여 현황을 알 수 있습니다.
      </p>
      <button className="Mainqkfhrkrl3"></button>
      {/*메인 바로가기 버튼3 */}
      <img src={dongrami} alt="동그라미" className="Maindongrami3"></img>
      <p className="Maintext3">도서/기기 정보를 추가합니다.</p>
    </div>
  );
};
export default MainPage;
