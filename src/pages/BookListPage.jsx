import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import { useNavigate } from "react-router-dom";

const BookListPage = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div>
      <img src={logo} alt="logoimage" />
      <img src={bar} alt="bar" className="BookListpagebar" />
      <img
        src={division}
        alt="divisionBar"
        className="BookListpagedivisionBar"
      />
      <div className="BookListpagespanTag">
        <span
          className="BookListpageSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="BookListpageLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        <span
          className="BookListpagehomeSpan"
          onClick={() => handleNavigation("/")}
        >
          홈
        </span>
        <span
          className="BookListpagebookUproadSpan"
          onClick={() => handleNavigation("/bookUproad")}
        >
          도서/기기 등록
        </span>
        <span
          className="BookListpagebookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서/기기 관리
        </span>
        <span
          className="BookListpagestudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="BookListpagecontectSpan"
          onClick={() => handleNavigation("/contect")}
        >
          비상 연락처
        </span>
      </div>
    </div>
  );
};
export default BookListPage;
