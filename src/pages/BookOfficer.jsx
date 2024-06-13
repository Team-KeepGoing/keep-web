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
      // Ensure data is an array before setting it
      if (Array.isArray(data)) {
        setFilteredData(data);
      } else {
        console.error("Fetched data is not an array:", data);
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
      const filtered = filteredData.filter(
        (book) =>
          book.title.includes(term) ||
          book.registrationDate.includes(term) ||
          book.availability.includes(term)
      );
      setFilteredData(filtered);
    } else {
      fetchBooks();
    }
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedData = [...filteredData];

    if (option === "title") {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "author") {
      sortedData.sort((a, b) => a.author.localeCompare(b.author));
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="title">{book.title}</td>
                <td className="author">{book.author}</td>
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
