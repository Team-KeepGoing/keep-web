import React, { useState, useEffect, useContext } from "react"; // useContext 추가
import { useNavigate } from "react-router-dom";
import bar from "assets/img/bar.svg";
import logo from "assets/img/Guideslogo.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import Header from "components/Header";
import MainNavbar from "./MainNavbar";
import config from "../config/config.json";
import "styles/MainStyle.css";
import "styles/Emergency.css";
import { AuthContext } from "./AuthContext"; // AuthContext 추가
import usericon from "../assets/img/usericon.svg";
import bookIcon from "../assets/img/bookIcon.svg";
import deviceIcon from "../assets/img/deviceIcon.svg";
import apple from "../assets/img/apple.svg";

const MainPage = () => {
  const { user } = useContext(AuthContext); // AuthContext에서 user 가져오기
  const [loading, setLoading] = useState(true); // loading과 setLoading 선언
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [notices, setNotices] = useState([]); // 공지 상태 초기화
  const [searchResults, setSearchResults] = useState([]);
  const [reports, setReports] = useState([]); // 신고 내역 상태 추가

  const navigate = useNavigate();
  console.log(user); // user 객체 확인

  const handleDevice = () => {
    navigate("/device");
  };

  const handleBook = () => {
    navigate("/bookOfficer");
  };

  const issueTypeMap = {
    COVER_DAMAGE: "표지 손상",
    PAGE_ISSUE: "페이지 관련 문제",
    BOOK_BODY_DAMAGE: "책 본체 손상",
    TEXT_PRINT_ISSUE: "텍스트 및 인쇄 문제",
    ENVIRONMENTAL_DAMAGE: "환경적 손상",
    SCREEN_ISSUE: "화면 관련 문제",
    CONNECTIVITY_ISSUE: "연결성 문제",
    BATTERY_POWER_ISSUE: "배터리 및 전원 문제",
    SOUND_ISSUE: "음향 문제",
    EXTERNAL_DAMAGE: "외부 파손",
    OTHER: "기타",
  };

  // 신고 내역 fetch
  useEffect(() => {
    const fetchReports = async () => {
      if (user && user.token) {
        try {
          const response = await fetch(`${config.serverurl}/damage/all`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();

          // 데이터가 있다면
          if (data.data) {
            const sortedReports = data.data
              .sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate))
              .slice(0, 4);
            setReports(sortedReports);
          }
        } catch (error) {
          console.error("Error fetching reports:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchReports();
  }, [user]);

  // 학생 데이터 fetch
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${config.serverurl}/student/all`);
        const data = await response.json();
        setStudents(data.data); // 서버에서 받은 데이터를 설정
      } catch (error) {
        console.error("Error fetching student data:", error);
        alert("학생 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchStudents();
  }, []);

  // 공지 데이터 fetch
  useEffect(() => {
    const fetchNotices = async () => {
      if (user && user.token) {
        try {
          const response = await fetch(
            `${config.serverurl}/notice/teacher-my`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.token}`, // 요청에 토큰 포함
              },
            }
          );

          // 응답이 성공적이지 않으면 에러 발생
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // 서버에서 받은 공지사항 배열을 notices 상태에 설정
          setNotices(data.data || []); // data 필드에서 notices를 설정
        } catch (error) {
          console.error("Error fetching notices:", error);
          setNotices([]);
          alert("공지사항을 불러오는 중 오류가 발생했습니다.");
        }
      } else {
        setNotices([]);
      }
    };

    fetchNotices();
  }, [user]);

  if (loading) {
    return <p>공지사항을 불러오는 중입니다...</p>; // 로딩 중 UI
  }

  const handleSearch = () => {
    if (!students || students.length === 0) {
      alert("학생 데이터가 없습니다.");
      return; // 학생 데이터가 없으면 검색을 중단
    }

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
      <h1>홈</h1>
      {/* 사용자 정보 출력 */}
      <div className="userInfo">
        {user && (
          <div>
            <p className="helloMent">
              환영합니다, <br />
              {user.name} 선생님
            </p>
            <p className="userEmail">{user.email}</p>
          </div>
        )}
        <img src={usericon} alt="usericon" className="usericon" />
      </div>
      {/* 신고 내역 출력 */}
      <h3 className="damageHistory">최근 신고된 내역</h3>
      <div className="reportTableWrapper">
        <div className="damageTable">
          {reports.length === 0 ? (
            <p>신고 내역이 없습니다.</p>
          ) : (
            <table className="reportTable">
              <thead>
                <tr>
                  <th>신고된 기기/도서</th>
                  <th>신고일</th>
                  <th>신고내용</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index} className="reportItem">
                    <td>{report.code}</td>
                    <td>
                      {`${new Date(report.reportDate).getFullYear()}-${String(
                        new Date(report.reportDate).getMonth() + 1
                      ).padStart(2, "0")}-${String(
                        new Date(report.reportDate).getDate()
                      ).padStart(2, "0")}`}
                    </td>
                    <td>
                      {issueTypeMap[report.issueType] || "알 수 없는 문제"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 공지 영역 */}
      <h3>내가 작성한 공지 불러오기</h3>
      <div className="notice">
        {notices.length === 0 ? (
          <p>공지 없음</p>
        ) : (
          notices.map((notice, index) => (
            <div key={index} className="noticeItem">
              <span className="noticeDate">
                {`${new Date(notice.createTime).getFullYear()}-${String(
                  new Date(notice.createTime).getMonth() + 1
                ).padStart(2, "0")}-${String(
                  new Date(notice.createTime).getDate()
                ).padStart(2, "0")}`}
              </span>

              <p>{notice.message}</p>
              <hr />
            </div>
          ))
        )}
      </div>
      {/* 기타 기능들 */}
      <div>
        <button onClick={handleDevice} className="deviceButton">
          <span className="firstPart">기자재를 한눈에!</span> <br />
          <span className="secondPart">기자재 관리</span>
          <img
            src={deviceIcon}
            alt="기기 이미지"
            className="deviceButtonImage"
          />
        </button>
        <button onClick={handleBook} className="bookButton">
          <span className="firstPart">대여 정보 한눈에!</span> <br />
          <span className="secondPart">도서 관리</span>
          <img src={bookIcon} alt="도서 이미지" className="bookButtonImage" />
        </button>
      </div>
      {/* 필터 및 검색 섹션 */}
      <div className="StudentFilter">
        <div className="StudentFilterTop">
          <p className="StudentFilterTitle">학생 검색</p>
          <button
            className="StudentFilterReset"
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
          className="StudentFilterSearch"
          placeholder="이름을 입력해주세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="StudentFilterSection">
          <p className="StudentFilterSectionTitle">학년</p>
          <div className="StudentFilterSectionButtonWrapper">
            {[1, 2, 3].map((el) => (
              <button
                className={`StudentFilterSectionButton${
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
        <div className="StudentFilterSection">
          <p className="StudentFilterSectionTitle">반</p>
          <div className="StudentFilterSectionButtonWrapper">
            {[1, 2, 3].map((el) => (
              <button
                className={`StudentFilterSectionButton${
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
        <div className="StudentFilterSection">
          <p className="StudentFilterSectionTitle">번호</p>
          <select
            className="StudentFilterSectionSelect"
            value={selectedNumber || ""}
            onChange={(e) => setSelectedNumber(Number(e.target.value))}
          >
            <option value="">번호 선택</option>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button className="StudentFilterButton" onClick={handleSearch}>
          검색
        </button>
      </div>
      <div className="footer">
        <img src={logo} alt="logo" className="logo2" />
        <div className="eep2" onClick={() => navigate("/")}>
          EEP
        </div>
        <p className="keepIntro">
          KEEP 은 팀 ‘킵고잉' 이 개발한 <br />
          스마트 기기 대여 및 비상연락망 확인 시스템 입니다.
        </p>
        <label className="download">교사용 다운로드</label>
        <button className="applenavigate">
          App Store
          <img src={apple} alt="apple" className="appleButtonImage" />
        </button>
        <p className="copyright">
          v 1.0.0 Copyright By Keep-Going team. All rights reserved. Since 2024
        </p>
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
