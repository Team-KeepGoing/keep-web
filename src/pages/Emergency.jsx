import React, { useState } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/Emergency.css";

const names = [
    {
        name: "김수아",
        number: "2201",
        phone: "010-1234-5678",
        email: "2201@dgsw.hs.kr",
    },
    {
        name: "류현서",
        number: "2202",
        phone: "010-1234-5678",
        email: "2202@dgsw.hs.kr",
    },
    {
        name: "박소진",
        number: "2203",
        phone: "010-1234-5678",
        email: "2203@dgsw.hs.kr",
    },
    {
        name: "이다경",
        number: "2204",
        phone: "010-1234-5678",
        email: "2204@dgsw.hs.kr",
    },
    {
        name: "이지수",
        number: "2205",
        phone: "010-1234-5678",
        email: "2205@dgsw.hs.kr",
    },
    {
        name: "최미래",
        number: "2206",
        phone: "010-1234-5678",
        email: "2206@dgsw.hs.kr",
    },
    {
        name: "김건우",
        number: "2207",
        phone: "010-1234-5678",
        email: "2207@dgsw.hs.kr",
    },
    {
        name: "김주환",
        number: "2208",
        phone: "010-1234-5678",
        email: "2208@dgsw.hs.kr",
    },
    {
        name: "김준환",
        number: "2209",
        phone: "010-1234-5678",
        email: "2209@dgsw.hs.kr",
    },
    {
        name: "박규민",
        number: "2210",
        phone: "010-1234-5678",
        email: "2210@dgsw.hs.kr",
    },
    {
        name: " 박상민",
        number: "2211",
        phone: "010-1234-5678",
        email: "2211@dgsw.hs.kr",
    },
    {
        name: "박시현",
        number: "2212",
        phone: "010-1234-5678",
        email: "2212@dgsw.hs.kr",
    },
    {
        name: "박재욱",
        number: "2213",
        phone: "010-1234-5678",
        email: "2213@dgsw.hs.kr",
    },
    {
        name: "박형언",
        number: "2214",
        phone: "010-1234-5678",
        email: "2214@dgsw.hs.kr",
    },
    {
        name: "이승혁",
        number: "2215",
        phone: "010-1234-5678",
        email: "2215@dgsw.hs.kr",
    },
    {
        name: "임 금",
        number: "2216",
        phone: "010-1234-5678",
        email: "2216@dgsw.hs.kr",
    },
];
const Emergency = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    const [selectedGrade, setSelectedGrade] = useState(1);
    const [selectedClass, setSelectedClass] = useState(1);
    const [selectedNumber, setSelectedNumber] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        name: "",
        number: "",
        phone: "",
        email: "",
    });
    return (
        <div className="Emergency">
            <img src={logo} alt="logoimage" className="Emergencylogo" />
            <div className="Emergencyeep">EEP</div>
            <div className="Emergencyment">비상연락처</div>
            {showModal ? (
                <div
                    className="EmergencyModalBg"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    <div
                        className="EmergencyModal"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <p className="EmergencyModalTitle">학생 정보</p>
                        <div className="EmergencyModalContent">
                            <div className="EmergencyModalImage" />
                            <div className="EmergencyModalContentRight">
                                <div className="EmergencyModalContentTitle">
                                    {modalInfo.name}
                                </div>
                                <div className="EmergencyModalContentText">
                                    {modalInfo.number[0] +
                                        "학년 " +
                                        modalInfo.number[1] +
                                        "반 " +
                                        parseInt(modalInfo.number[2] + modalInfo.number[3]) +
                                        "번"}
                                </div>
                                <div className="EmergencyModalContentText">
                                    {modalInfo.phone}
                                </div>
                                <div className="EmergencyModalContentText">
                                    {modalInfo.email}
                                </div>
                                <button className="EmergencyModalContentButton">
                                    학생 정보 수정
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <img src={buttonBack} alt="buttonBack" className="EmergencybuttonBack" />
            <div className="Emergencyment2">손쉽게 학생 정보를 확인하세요.</div>
            <div className="EmergencyContent">
                <div className="EmergencyGrid">
                    {names.map((name) => (
                        <Card
                            key={name.number}
                            name={name.name}
                            number={name.number}
                            openModal={() => {
                                setShowModal(true);
                                setModalInfo(name);
                            }}
                        />
                    ))}
                </div>
                <div className="EmergencyFilter">
                    <div className="EmergencyFilterTop">
                        <p className="EmergencyFilterTitle">필터</p>
                        <button
                            className="EmergencyFilterReset"
                            onClick={() => {
                                setSelectedGrade(1);
                                setSelectedClass(1);
                                setSelectedNumber(1);
                            }}
                        >
                            초기화
                        </button>
                    </div>
                    <input
                        className="EmergencyFilterSearch"
                        placeholder="이름을 입력해주세요."
                    />
                    <div className="EmergencyFilterSection">
                        <p className="EmergencyFilterSectionTitle">학년</p>
                        <div className="EmergencyFilterSectionButtonWrapper">
                            {[1, 2, 3].map((el) => (
                                <button
                                    className={`EmergencyFilterSectionButton${el === selectedGrade ? "Active" : ""}`}
                                    key={el}
                                    onClick={() => setSelectedGrade(el)}
                                >
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="EmergencyFilterSection">
                        <p className="EmergencyFilterSectionTitle">반</p>
                        <div className="EmergencyFilterSectionButtonWrapper">
                            {[1, 2, 3, 4].map((el) => (
                                <button
                                    className={`EmergencyFilterSectionButton${el === selectedClass ? "Active" : ""}`}
                                    key={el}
                                    onClick={() => setSelectedClass(el)}
                                >
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="EmergencyFilterSection">
                        <p className="EmergencyFilterSectionTitle">번호</p>
                        <select
                            className="EmergencyFilterSectionSelect"
                            value={selectedNumber}
                            onChange={(e) => setSelectedNumber(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                                (el) => (
                                    <option key={el} value={el}>
                                        {el}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <button className="EmergencyFilterButton">검색</button>
                </div>
            </div>
            <img src={bar} alt="bar" className="Emergencybar" />
            <img src={division} alt="divisionBar" className="EmergencydivisionBar" />
            <div className="EmergencyspanTag">
        <span
            className="EmergencySignupSpan"
            onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
                <span
                    className="EmergencyLoginSpan"
                    onClick={() => handleNavigation("/signin")}
                >
          로그인
        </span>
                <span
                    className="EmergencyhomeSpan"
                    onClick={() => handleNavigation("/")}
                >
          홈
        </span>
                <span
                    className="EmergencybookOfficerSpan"
                    onClick={() => handleNavigation("/bookOfficer")}
                >
          도서 관리
        </span>
                <span
                    className="EmergencyDeviceSpan"
                    onClick={() => handleNavigation("/device")}
                >
          기기 관리
        </span>
                <span
                    className="EmergencystudentInfoSpan"
                    onClick={() => handleNavigation("/studentInfo")}
                >
          학생 정보 입력
        </span>
                <span
                    className="EmergencySpan"
                    onClick={() => handleNavigation("/Emergency")}
                >
          비상 연락처
        </span>
            </div>
        </div>
    );
};

export default Emergency;

const Card = ({ name, number, openModal }) => {
    return (
        <div className="EmergencyCard" onClick={openModal}>
            <div className="EmergencyCardCircle" />
            <div className="EmergencyCardImage" />
            <div className="EmergencyCardName">{name}</div>
            <div className="EmergencyCardNumber">{number}</div>
        </div>
    );
};
