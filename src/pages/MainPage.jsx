import React from "react";
import { useNavigate } from "react-router-dom";
import bar from "assets/img/bar.svg";
import logo from "assets/img/Guideslogo.svg";
import book from "assets/img/book.svg";
import device from "assets/img/device.svg";
import student from "assets/img/student.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import bottombar from "assets/img/mainbottombar.svg";
import config from "../config/config.json";
import MainNavbar from "./MainNavbar";
import "styles/MainStyle.css";

const MainPage = () => {
  const navigate = useNavigate();

  const navigationItems = [
    { label: "홈", path: "/", className: "MainhomeSpan" },
    {
      label: "도서 관리",
      path: "/bookOfficer",
      className: "MainbookOfficerSpan",
    },
    { label: "기기 관리", path: "/device", className: "MainDeviceSpan" },
    {
      label: "학생 정보 입력",
      path: "/studentInfo",
      className: "MainstudentInfoSpan",
    },
    { label: "비상 연락처", path: "/Emergency", className: "MaincontectSpan" },
  ];

  const serviceItems = [
    {
      alt: "학생 사진",
      imgSrc: student,
      text: "손쉽게 학생 정보를 확인하세요.",
      buttonClassName: "Mainqkfhrkrl",
      buttonPath: "/emergency",
      imgClassName: "Maindongrami1",
      textClassName: "Maintext1",
    },
    {
      alt: "도서 사진",
      imgSrc: book,
      text: "도서의 실시간 대여 현황과\n목록을 확인하세요.",
      buttonClassName: "Mainqkfhrkrl2",
      buttonPath: "/bookOfficer",
      imgClassName: "Maindongrami2",
      textClassName: "Maintext2",
    },
    {
      alt: "기기 사진",
      imgSrc: device,
      text: "기기의 실시간 대여 현황과\n목록을 확인하세요.",
      buttonClassName: "Mainqkfhrkrl3",
      buttonPath: "/device",
      imgClassName: "Maindongrami3",
      textClassName: "Maintext3",
    },
  ];

  return (
    <div className="Mainbackground">
      <MainNavbar />
      <img src={logo} alt="logo" className="Mainlogo" />
      <div className="Maineep" onClick={() => navigate("/")}>
        EEP
      </div>
      <img src={bar} alt="bar" className="Mainbar" />
      <img src={buttonBack} alt="buttonBack" className="MainbuttonBack" />

      {navigationItems.map((item) => (
        <span
          key={item.label}
          className={item.className}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </span>
      ))}

      <h2>맞춤서비스</h2>
      <div className="Maintext">
        KEEP이 제공하는 맞춤 서비스를 한눈에 확인하세요
      </div>

      {serviceItems.map((item, index) => (
        <React.Fragment key={index}>
          <button
            className={item.buttonClassName}
            onClick={() => navigate(item.buttonPath)}
          />
          <img src={item.imgSrc} alt={item.alt} className={item.imgClassName} />
          <p className={item.textClassName}>
            {item.text.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </React.Fragment>
      ))}

      <img src={bottombar} alt="bottombar" className="Mainbottombar" />
    </div>
  );
};

export default MainPage;
