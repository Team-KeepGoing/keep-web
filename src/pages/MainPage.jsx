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
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="Mainbackground">
      <MainNavbar />
      <img src={logo} alt="logo" className="Mainlogo" />
      <div className="Maineep" onClick={() => handleNavigation("/")}>EEP</div>
      <img src={bar} alt="bar" className="Mainbar" />
      <img src={buttonBack} alt="buttonBack" className="MainbuttonBack" />
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
      <div className="Maintext">
        KEEP이 제공하는 맞춤 서비스를 한눈에 확인하세요
      </div>
      <button
        className="Mainqkfhrkrl"
        onClick={() => handleNavigation("/emergency")}
      ></button>
      <img src={student} alt="학생 사진" className="Maindongrami1"></img>
      <p className="Maintext1">손쉽게 학생 정보를 확인하세요.</p>
      <button
        className="Mainqkfhrkrl2"
        onClick={() => handleNavigation("/bookOfficer")}
      ></button>
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
