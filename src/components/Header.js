import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({
  logo = "defaultLogo.png",
  bar = "defaultBar.png",
  buttonBack = "defaultButtonBack.png",
  styles = {},
  activePage, // 추가된 prop: 현재 활성화된 페이지를 받아옴
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerContainer}>
      <img src={logo} alt="logo" className="logo" />
      <div className="eep" onClick={() => navigate("/")}>
        EEP
      </div>
      <img src={buttonBack} alt="buttonBack" className={styles.buttonBack} />
      <img src={bar} alt="bar" className="bar" />
      <span className={styles.homeSpan} onClick={() => navigate("/")}>
        홈
      </span>
      <span
        className={`${styles.bookOfficerSpan} ${
          activePage === "bookOfficer" ? "active" : ""
        }`}
        onClick={() => navigate("/bookOfficer")}
      >
        도서 관리
      </span>
      <span
        className={`${styles.deviceSpan} ${
          activePage === "device" ? "active" : ""
        }`}
        onClick={() => navigate("/device")}
      >
        기기 관리
      </span>
      <span
        className={`${styles.studentInfoSpan} ${
          activePage === "studentInfo" ? "active" : ""
        }`}
        onClick={() => navigate("/studentInfo")}
      >
        학생 정보 입력
      </span>
      <span
        className={`${styles.emergencySpan} ${
          activePage === "emergency" ? "active" : ""
        }`}
        onClick={() => navigate("/Emergency")}
      >
        비상 연락처
      </span>
      <span
        className={`${styles.declarationSpan} ${
          activePage === "declaration" ? "active" : ""
        }`}
        onClick={() => navigate("/declaration")}
      >
        신고 내역 확인
      </span>
    </div>
  );
};

export default Header;
