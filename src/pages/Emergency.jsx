import React, { useState, useEffect } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
// import division from "assets/img/divisionBar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/Emergency.css";
import MainNavbar from "./MainNavbar";

const Emergency = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    studentName: "",
    studentId: "",
    phoneNum: "",
    address: "",
    mail: "",
  });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://3.34.2.12:8080/student/all")
      .then(response => response.json())
      .then(data => setStudents(data.data))
      .catch(error => console.error("Error fetching student data:", error));
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="Emergency">
      <MainNavbar />
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
          {students.map((student) => (
            <Card
              key={student.id}
              studentName={student.studentName}
              studentId={student.studentId}
              openModal={() => {
                setShowModal(true);
                setModalInfo({
                  ...student,
                  address: "대소고" // Assuming address is not available in the API response, set a default value
                });
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
      <div className="EmergencyspanTag">
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
