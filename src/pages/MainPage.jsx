import React from "react";
import { useNavigate } from "react-router-dom";
import bar from "assets/img/bar.svg";
import logo from "assets/img/Guideslogo.svg";
import book from "assets/img/book.svg";
import device from "assets/img/device.svg";
import student from "assets/img/student.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import "styles/MainStyle.css";
import bottombar from "assets/img/mainbottombar.svg";
import MainNavbar from "./MainNavbar";

const MainPage = () => {
  const navigate = useNavigate();

  // 네비게이션 연결 함수처리
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="Mainbackground">
      <MainNavbar />
      <img src={logo} alt="logo" className="Mainlogo" /> {/*킵 로고 사진 */}
      <div className="Maineep">EEP</div> {/*킵 로고 */}
      <img src={bar} alt="bar" className="Mainbar" />
      {/*네비게이션 모음 아래 배경 사진 */}
      <img src={buttonBack} alt="buttonBack" className="MainbuttonBack" />
      {/* 홈화면의 네비게이션 버튼 뒷 배경 */}
      <span className="MainhomeSpan" onClick={() => handleNavigation("/")}>
        홈
      </span>
      <span
        className="MainbookOfficerSpan"
        onClick={() => handleNavigation("/bookOfficer")}
      >
        도서 관리
      </span>
      <span
        className="MainDeviceSpan"
        onClick={() => handleNavigation("/device")}
      >
        기기 관리
      </span>
      <span
        className="MainstudentInfoSpan"
        onClick={() => handleNavigation("/studentInfo")}
      >
        학생 정보 입력
      </span>
      <span
        className="MaincontectSpan"
        onClick={() => handleNavigation("/Emergency")}
      >
        비상 연락처
      </span>
      <h2>맞춤서비스</h2>
      {/*메인 멘트 */}
      <div className="Maintext">
        KEEP이 제공하는 맞춤 서비스를 한눈에 확인하세요
      </div>
      <button
        className="Mainqkfhrkrl"
        onClick={() => handleNavigation("/emergency")}
      ></button>
      {/*메인 바로가기 버튼1 */}
      <img src={student} alt="학생 사진" className="Maindongrami1"></img>
      <p className="Maintext1">손쉽게 학생 정보를 확인하세요.</p>
      <button
        className="Mainqkfhrkrl2"
        onClick={() => handleNavigation("/bookOfficer")}
      ></button>
      {/*메인 바로가기 버튼2 */}
      <img src={book} alt="도서 사진" className="Maindongrami2"></img>
      <p className="Maintext2">
        도서의 실시간 대여 현황과
        <br />
        목록을 확인하세요.
      </p>
      <button
        className="Mainqkfhrkrl3"
        onClick={() => handleNavigation("/device")}
      ></button>
      {/*메인 바로가기 버튼3 */}
      <img src={device} alt="기기 사진" className="Maindongrami3"></img>
      <p className="Maintext3">
        기기의 실시간 대여 현황과 <br />
        목록을 확인하세요.
      </p>
      <img src={bottombar} alt="bottombar" className="Mainbottombar" />
    </div>
  );
};

export default MainPage;
