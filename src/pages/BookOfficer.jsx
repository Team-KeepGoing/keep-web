import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import question from "../assets/img/question.svg";
import "styles/BookOfficer.css";
import MainNavbar from "./MainNavbar";

const BookOfficer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://3.34.2.12:8080/book/all");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      console.log("Fetched Books:", data);

      if (data && Array.isArray(data.data)) {
        setAllBooks(data.data);
        setFilteredData(data.data);
      } else {
        console.error("Fetched data is not valid:", data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = allBooks.filter(
        (book) =>
          book.bookName.includes(term) ||
          book.registrationDate.includes(term) ||
          book.state.includes(term) ||
          book.writer.includes(term)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(allBooks);
    }
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedData = [...filteredData];

    if (option === "title") {
      sortedData.sort((a, b) => a.bookName.localeCompare(b.bookName));
    } else if (option === "author") {
      sortedData.sort((a, b) => a.writer.localeCompare(b.writer));
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

  const handleViewBook = (index) => {
    const selectedBook = filteredData[index];
    navigate("/viewBook", { state: { book: selectedBook } });
  };

  const translateState = (state) => {
    if (state === "AVAILABLE") return "대여 가능";
    if (state === "RENTED") return "대여 중";
    return state;
  };

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="BookOfficer">
      <MainNavbar />
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
      <img src={question} alt="questionimg" className="questionimg" />
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
          placeholder="도서 제목을 검색해주세요."
          className="BookOfficerSearch"
        />
        <div className="SortDropdownWrapper">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="SortDropdown"
          >
            <option value="">정렬</option>
            <option value="title">제목 순</option>
            <option value="author">글쓴이 순</option>
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
              <th className="title">도서 제목</th>
              <th className="author">글쓴이</th>
              <th className="registrationDate">등록일</th>
              <th className="availability">대여 여부</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((book, index) => (
              <tr
                key={index}
                onClick={() => handleViewBook(index)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td className="title">{book.bookName}</td>
                <td className="author">{book.writer}</td>
                <td className="registrationDate">
                  {formatRegistrationDate(book.registrationDate)}
                </td>
                <td className="availability">
                  <span
                    style={{
                      color: book.state === "AVAILABLE" ? "#3182F7" : "#32C000",
                    }}
                  >
                    {translateState(book.state)}
                  </span>
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
