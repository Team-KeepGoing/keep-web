import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import division from "../assets/img/divisionBar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import question from "../assets/img/question.svg";
import "styles/BookOfficer.css";

const initialBookData = [
  {
    title: "나는 너랑 노는게 제일 좋아",
    registrationDate: "2024-05-25",
    availability: "대여 가능",
  },
  {
    title: "모비딕",
    registrationDate: "2024-05-25",
    availability: "대여 중",
  },
  {
    title: "인간실격",
    registrationDate: "2024-05-25",
    availability: "대여 중",
  },
  {
    title: "나를 소모하지 않는 현명한 태도에 관하여",
    registrationDate: "2024-05-28",
    availability: "대여 가능",
  },
  {
    title: "역행자",
    registrationDate: "2024-05-22",
    availability: "대여 가능",
  },
  {
    title: "우리는 모두 죽는다는 것을 기억하라",
    registrationDate: "2024-05-22",
    availability: "대여 중",
  },
  {
    title: "벼랑 끝이지만 아직 떨어지진 않았어",
    registrationDate: "2024-05-22",
    availability: "대여 가능",
  },
  {
    title: "삶을 견디는 기쁨",
    registrationDate: "2024-05-22",
    availability: "대여 가능",
  },
  {
    title: "죽지 않는 소녀",
    registrationDate: "2024-05-22",
    availability: "대여 중",
  },
];

const BookOfficer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(initialBookData);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = initialBookData.filter(
        (book) =>
          book.title.includes(term) ||
          book.registrationDate.includes(term) ||
          book.availability.includes(term)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(initialBookData);
    }
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedData = [...filteredData];

    if (option === "title") {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "date") {
      sortedData.sort(
        (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
      );
    }

    setFilteredData(sortedData);
  };

  const handleBookRegistration = () => {
    handleNavigation("/BookEntry");
  };

  const handleEditBook = (index) => {
    const selectedBook = filteredData[index];
    navigate("/editBook", { state: { book: selectedBook } });
  };

  return (
    <div className="BookOfficerbookOfficer">
      <img src={logo} alt="logo" className="BookOfficerlogo" />
      <div className="BookOfficereep">EEP</div>
      <div className="BookOfficerment">도서 관리하기</div>
      <img
        src={buttonBack}
        alt="buttonBack"
        className="BookOfficerbuttonBack"
      />
      <div className="BookOfficerment2">도서 관리를 더욱 쉽게 도와줍니다.</div>
      <img src={bar} alt="bar" className="BookOfficerbar" />
      <img
        src={division}
        alt="divisionBar"
        className="BookOfficerdivisionBar"
      />
      <img src={question} alt="questionimg" className="questionimg" />
      <div className="BookOfficerspanTag">
        <span
          className="BookOfficerSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="BookOfficerLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
      </div>
      <span
        className="BookOfficerhomeSpan"
        onClick={() => handleNavigation("/")}
      >
        홈
      </span>
      <span
        className="BookOfficerSpan"
        onClick={() => handleNavigation("/bookOfficer")}
      >
        도서 관리
      </span>
      <span
        className="BookOfficerdeviceSpan"
        onClick={() => handleNavigation("/device")}
      >
        기기 관리
      </span>
      <span
        className="BookOfficerstudentInfoSpan"
        onClick={() => handleNavigation("/studentInfo")}
      >
        학생 정보 입력
      </span>
      <span
        className="BookOfficerEmergencySpan"
        onClick={() => handleNavigation("/Emergency")}
      >
        비상 연락처
      </span>

      <div className="BookOfficerSearchWrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="도서 이름을 검색해주세요."
          className="BookOfficerSearch"
        />
        <div className="SortDropdownWrapper">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="SortDropdown"
          >
            <option value="">정렬</option>
            <option value="title">이름 순</option>
            <option value="date">등록일 순</option>
          </select>
        </div>
      </div>
      <button onClick={handleBookRegistration} className="RegisterButton">
        도서 추가하기
      </button>
      <div className="BookOfficerTable">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="title">도서 이름</th>
              <th className="registrationDate">등록일</th>
              <th className="availability">대여 여부</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="title">{book.title}</td>
                <td className="registrationDate">{book.registrationDate}</td>
                <td className="availability">
                  <span
                    style={{
                      color:
                        book.availability === "대여 가능"
                          ? "#3182F7"
                          : "#32C000",
                    }}
                  >
                    {book.availability}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEditBook(index)}
                    className="checkBox"
                  ></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookOfficer;
