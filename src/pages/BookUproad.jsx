import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/BookUproad.css";

const BookUproad = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="BookUproad">
      <img src={logo} alt="logoimage" className="BookUproadlogo" />
      <div className="BookUproadeep">EEP</div>
      <div className="BookUproadment">도서/기기 등록</div>
      <img src={buttonBack} alt="buttonBack" className="BookUproadbuttonBack" />
      <div className="BookUproadment2">
        도서/기기의 기본 정보를 등록해주세요.
      </div>
      <img src={bar} alt="bar" className="BookUproadbar" />
      <img src={division} alt="divisionBar" className="BookUproaddivisionBar" />
      <div className="BookUproadspanTag">
        <span
          className="BookUproadSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="BookUproadLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        <span
          className="BookUproadhomeSpan"
          onClick={() => handleNavigation("/")}
        >
          홈
        </span>
        <span
          className="BookUproadSpan"
          onClick={() => handleNavigation("/bookUproad")}
        >
          도서/기기 등록
        </span>
        <span
          className="BookUproadbookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서/기기 관리
        </span>
        <span
          className="BookUproadstudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="BookUproadcontectSpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
        <div className="BookUproadduddur">
          <p className="BookUproadrlrl">내 기기에서</p>
          <label className="input-file-button" htmlFor="input-file">
            찾아보기
          </label>
        </div>
        <input type="file" id="input-file" className="BookUproadFile" />
      </div>
    </div>
  );
};

export default BookUproad;
