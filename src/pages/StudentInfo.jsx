import React from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/StudentInfo.css";

const StudentInfo = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="StudentInfo">
            <img src={logo} alt="logoimage" className="StudentInfologo" />
            <div className="StudentInfoeep">EEP</div>
            <div className="StudentInfoment">학생 정보 입력</div>
            <img src={buttonBack} alt="buttonBack" className="StudentInfobuttonBack" />
            <div className="StudentInfoment2">학생들의 기본 정보를 등록해주세요.</div>
            <img src={bar} alt="bar" className="StudentInfobar" />
            <img src={division} alt="divisionBar" className="StudentInfodivisionBar" />
            <div className="StudentInfospanTag">
        <span
            className="StudentInfoSignupSpan"
            onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
                <span
                    className="StudentInfoLoginSpan"
                    onClick={() => handleNavigation("/signin")}
                >
          로그인
        </span>
                <span
                    className="StudentInfohomeSpan"
                    onClick={() => handleNavigation("/")}
                >
          홈
        </span>
                <span
                    className="StudentInfoBookUproadSpan"
                    onClick={() => handleNavigation("/bookUproad")}
                >
          도서/기기 등록
        </span>
                <span
                    className="StudentInfobookOfficerSpan"
                    onClick={() => handleNavigation("/bookOfficer")}
                >
          도서/기기 관리
        </span>
                <span
                    className="StudentInfostudentInfoSpan"
                    onClick={() => handleNavigation("/studentInfo")}
                >
          학생 정보 입력
        </span>
                <span
                    className="StudentInfoSpan"
                    onClick={() => handleNavigation("/StudentInfo")}
                >
          비상 연락처
        </span>
                <div className=""></div>
            </div>
        </div>
    );
};

export default StudentInfo;
