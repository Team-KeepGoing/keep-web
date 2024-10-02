import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

// 기본 props 설정
const Header = ({
  logo = "defaultLogo.png",
  bar = "defaultBar.png",
  buttonBack = "defaultButtonBack.png",
  styles = {},
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
        className={styles.bookOfficerSpan}
        onClick={() => navigate("/bookOfficer")}
      >
        도서 관리
      </span>
      <span className={styles.deviceSpan} onClick={() => navigate("/device")}>
        기기 관리
      </span>
      <span
        className={styles.studentInfoSpan}
        onClick={() => navigate("/studentInfo")}
      >
        학생 정보 입력
      </span>
      <span
        className={styles.emergencySpan}
        onClick={() => navigate("/Emergency")}
      >
        비상 연락처
      </span>
    </div>
  );
};

export default Header;
