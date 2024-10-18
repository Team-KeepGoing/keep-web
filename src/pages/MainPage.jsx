import config from "../config/config.json";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router 추가
import bar from "assets/img/bar.svg";
import logo from "assets/img/Guideslogo.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import Header from "components/Header";
import MainNavbar from "./MainNavbar";
import "styles/MainStyle.css";
import "styles/Emergency.css";

const MainPage = () => {
  const [students, setStudents] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`${config.serverurl}/student/all`)
      .then((response) => response.json())
      .then((data) => setStudents(data.data)) // 서버에서 받은 데이터를 설정
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  const handleSearch = () => {
    const filteredStudents = students.filter((student) => {
      const studentGrade = parseInt(student.studentId.substring(0, 1));
      const studentClass = parseInt(student.studentId.substring(1, 2));
      const studentNumber = parseInt(student.studentId.substring(2));

      const isGradeMatch =
        selectedGrade === null || studentGrade === selectedGrade;
      const isClassMatch =
        selectedClass === null || studentClass === selectedClass;
      const isNumberMatch =
        selectedNumber === null || studentNumber === selectedNumber;
      const isNameMatch = student.studentName.includes(searchQuery);

      return isNameMatch && isGradeMatch && isClassMatch && isNumberMatch;
    });

    if (filteredStudents.length > 0) {
      alert("검색 성공!");
      setSearchResults(filteredStudents);

      // 검색 성공 후 /emergency 페이지로 이동, 검색 결과 전달
      navigate("/emergency", { state: { searchResults: filteredStudents } });
    } else {
      alert("검색 결과가 없습니다.");
      setSearchResults([]);
    }
  };

  return (
    <div className="Mainbackground">
      <MainNavbar />
      <Header
        logo={logo}
        bar={bar}
        buttonBack={buttonBack}
        styles={{
          headerContainer: "MainHeaderContainer",
          buttonBack: "MainbuttonBack",
          homeSpan: "MainhomeSpan",
          bookOfficerSpan: "MainbookOfficerSpan",
          deviceSpan: "MainDeviceSpan",
          studentInfoSpan: "MainstudentInfoSpan",
          emergencySpan: "MaincontectSpan",
          declarationSpan: "HomeDamageSpan",
        }}
      />

      <div className="EmergencyFilter">
        <div className="EmergencyFilterTop">
          <p className="EmergencyFilterTitle">필터</p>
          <button
            className="EmergencyFilterReset"
            onClick={() => {
              setSelectedGrade(null);
              setSelectedClass(null);
              setSelectedNumber(null);
              setSearchQuery("");
              setSearchResults([]);
            }}
          >
            초기화
          </button>
        </div>
        <input
          className="EmergencyFilterSearch"
          placeholder="이름을 입력해주세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
            value={selectedNumber || ""}
            onChange={(e) => setSelectedNumber(Number(e.target.value))}
          >
            <option value="">번호 선택</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button className="EmergencyFilterButton" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
};

export default MainPage;

// const navigate = useNavigate();

// const navigationItems = [
//   { label: "홈", path: "/", className: "MainhomeSpan" },
//   {
//     label: "도서 관리",
//     path: "/bookOfficer",
//     className: "MainbookOfficerSpan",
//   },
//   { label: "기기 관리", path: "/device", className: "MainDeviceSpan" },
//   {
//     label: "학생 정보 입력",
//     path: "/studentInfo",
//     className: "MainstudentInfoSpan",
//   },
//   { label: "비상 연락처", path: "/Emergency", className: "MaincontectSpan" },
// ];

// const serviceItems = [
//   {
//     alt: "학생 사진",
//     imgSrc: student,
//     text: "손쉽게 학생 정보를 확인하세요.",
//     buttonClassName: "Mainqkfhrkrl",
//     buttonPath: "/emergency",
//     imgClassName: "Maindongrami1",
//     textClassName: "Maintext1",
//   },
//   {
//     alt: "도서 사진",
//     imgSrc: book,
//     text: "도서의 실시간 대여 현황과\n목록을 확인하세요.",
//     buttonClassName: "Mainqkfhrkrl2",
//     buttonPath: "/bookOfficer",
//     imgClassName: "Maindongrami2",
//     textClassName: "Maintext2",
//   },
//   {
//     alt: "기기 사진",
//     imgSrc: device,
//     text: "기기의 실시간 대여 현황과\n목록을 확인하세요.",
//     buttonClassName: "Mainqkfhrkrl3",
//     buttonPath: "/device",
//     imgClassName: "Maindongrami3",
//     textClassName: "Maintext3",
//   },
// ];

{
  /* 
      {navigationItems.map((item) => (
        <span
          key={item.label}
          className={item.className}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </span>
      ))} */
}

{
  /* <h2>맞춤서비스</h2>
      <div className="Maintext">
        KEEP이 제공하는 맞춤 서비스를 한눈에 확인하세요
      </div> */
}

{
  /* {serviceItems.map((item, index) => (
        <React.Fragment key={index}>
          <button
            className={item.buttonClassName}
            onClick={() => navigate(item.buttonPath)}
          />
          {/* <img src={item.imgSrc} alt={item.alt} className={item.imgClassName} /> 
          {/* <p className={item.textClassName}> 
            {item.text.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p> 
        </React.Fragment>
      ))} */
}
