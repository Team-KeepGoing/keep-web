import React, { useState } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/Emergency.css";

const names = [
  {
    studentName: "김수아",
    studentId: "2201",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2201@dgsw.hs.kr",
  },
  {
    studentName: "류현서",
    studentId: "2202",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2202@dgsw.hs.kr",
  },
  {
    studentName: "박소진",
    studentId: "2203",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2203@dgsw.hs.kr",
  },
  {
    studentName: "이다경",
    studentId: "2204",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2204@dgsw.hs.kr",
  },
  {
    studentName: "이지수",
    studentId: "2205",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2205@dgsw.hs.kr",
  },
  {
    studentName: "최미래",
    studentId: "2206",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2206@dgsw.hs.kr",
  },
  {
    studentName: "김건우",
    studentId: "2207",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2207@dgsw.hs.kr",
  },
  {
    studentName: "김주환",
    studentId: "2208",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2208@dgsw.hs.kr",
  },
  {
    studentName: "김준환",
    studentId: "2209",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2209@dgsw.hs.kr",
  },
  {
    studentName: "박규민",
    studentId: "2210",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2210@dgsw.hs.kr",
  },
  {
    studentName: " 박상민",
    studentId: "2211",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2211@dgsw.hs.kr",
  },
  {
    studentName: "박시현",
    studentId: "2212",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2212@dgsw.hs.kr",
  },
  {
    studentName: "박재욱",
    studentId: "2213",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2213@dgsw.hs.kr",
  },
  {
    studentName: "박형언",
    studentId: "2214",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2214@dgsw.hs.kr",
  },
  {
    studentName: "이승혁",
    studentId: "2215",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2215@dgsw.hs.kr",
  },
  {
    studentName: "임 금",
    studentId: "2216",
    phoneNum: "010-1234-5678",
    address: "대소고",
    mail: "2216@dgsw.hs.kr",
  },
];
const Emergency = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedNumberr, setSelectedNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    studentName: "",
    studentId: "",
    phoneNum: "",
    address: "",
    mail: "",
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
                  {modalInfo.studentName}
                </div>
                <div className="EmergencyModalContentText">
                  {modalInfo.studentId[0] +
                    "학년 " +
                    modalInfo.studentId[1] +
                    "반 " +
                    parseInt(modalInfo.studentId[2] + modalInfo.studentId[3]) +
                    "번"}
                </div>
                <div className="EmergencyModalContentText">
                  {modalInfo.phoneNum}
                </div>
                <div className="EmergencyModalContentText">
                  {modalInfo.address}
                </div>
                <div className="EmergencyModalContentText">
                  {modalInfo.mail}
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
          {names.map((studentName) => (
            <Card
              key={studentName.studentId}
              studentName={studentName.studentName}
              studentId={studentName.studentId}
              openModal={() => {
                setShowModal(true);
                setModalInfo(studentName);
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
                  className={`EmergencyFilterSectionButton${
                    el === selectedGrade ? "Active" : ""
                  }`}
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
                  className={`EmergencyFilterSectionButton${
                    el === selectedClass ? "Active" : ""
                  }`}
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
              value={selectedNumberr}
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

const Card = ({ studentName, studentId, openModal }) => {
  return (
    <div className="EmergencyCard" onClick={openModal}>
      <div className="EmergencyCardCircle" />
      <div className="EmergencyCardImage" />
      <div className="EmergencyCardName">{studentName}</div>
      <div className="EmergencyCardNumber">{studentId}</div>
    </div>
  );
};
