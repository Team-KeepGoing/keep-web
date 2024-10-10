import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import question from "../assets/img/question.svg";
import "../styles/BookOfficer.css";
import MainNavbar from "./MainNavbar";
import ViewBook from "./ViewBook";
import Modal from "./Modal";
import BookEntry from "./BookEntry";
import EditBook from "./EditBook";
import Header from "components/Header";
import SearchBar from "../components/SearchBar";
import config from "../config/config.json";

const formatRegistrationDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const translateState = (state) => {
  switch (state) {
    case "AVAILABLE":
      return "대여 가능";
    case "RENTED":
      return "대여 중";
    case "INACTIVE":
      return "대여 불가";
    default:
      return "알 수 없음";
  }
};

const BookOfficer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookEntryOpen, setIsBookEntryOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${config.serverurl}/book/all`);
      if (!response.ok) throw new Error("Failed to fetch books");

      const data = await response.json();

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

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterAndSortBooks(term, sortOption);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    filterAndSortBooks(searchTerm, option);
  };

  const filterAndSortBooks = (term, sortOption) => {
    let filteredBooks = allBooks;

    if (term) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.bookName.includes(term) ||
          book.registrationDate.includes(term) ||
          book.state.includes(term) ||
          book.writer.includes(term)
      );
    }

    if (sortOption === "title") {
      filteredBooks.sort((a, b) => a.bookName.localeCompare(b.bookName));
    } else if (sortOption === "author") {
      filteredBooks.sort((a, b) => a.writer.localeCompare(b.writer));
    } else if (sortOption === "date") {
      filteredBooks.sort(
        (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
      );
    }

    setFilteredData(filteredBooks);
  };

  const handleViewBook = (index) => {
    const selectedBook = filteredData[index];
    setSelectedBook(selectedBook);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const openBookEntryModal = () => {
    setIsBookEntryOpen(true);
  };

  const closeBookEntryModal = async () => {
    setIsBookEntryOpen(false);
    await fetchBooks();
  };

  const closeEditBookModal = async () => {
    setIsEditBookOpen(false);
    setBookToEdit(null);
    await fetchBooks();
  };

  return (
    <div className="BookOfficer">
      <MainNavbar />
      <div className="BookOfficerment">도서 관리하기</div>
      <div className="BookOfficerment2">도서 관리를 더욱 쉽게 도와줍니다.</div>
      <img src={question} alt="questionimg" className="questionimg" />
      <Header
        logo={logo}
        bar={bar}
        buttonBack={buttonBack}
        styles={{
          headerContainer: "BookOfficerHeaderContainer",
          buttonBack: "BookOfficerbuttonBack",
          homeSpan: "BookOfficerhomeSpan",
          bookOfficerSpan: "BookOfficerSpan",
          deviceSpan: "BookOfficerdeviceSpan",
          studentInfoSpan: "BookOfficerstudentInfoSpan",
          emergencySpan: "BookOfficerEmergencySpan",
        }}
      />
      <SearchBar
        searchTerm={searchTerm}
        handleSearch={(e) => handleSearch(e)}
        sortOption={sortOption}
        handleSortChange={(e) => handleSortChange(e)}
        placeholder="검색어를 입력해주세요."
      />

      <button onClick={openBookEntryModal} className="RegisterButton">
        도서 추가하기
      </button>
      <div className="BookOfficerTable">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="title">도서 제목</th>
              <th className="author">작가</th>
              <th className="registrationDate">등록일</th>
              <th className="availability">대여 여부</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((book, index) => (
              <tr key={index} onClick={() => handleViewBook(index)}>
                <td>{index + 1}</td>
                <td className="title">{book.bookName}</td>
                <td className="author">{book.writer}</td>
                <td className="registrationDate">
                  {formatRegistrationDate(book.registrationDate)}
                </td>
                <td className="availability">
                  <span
                    style={{
                      color: book.state === "AVAILABLE" ? "#32C000" : "#3182F7",
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

      {selectedBook && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ViewBook
            book={selectedBook}
            isOpen={isModalOpen}
            onClose={closeModal}
            refreshBooks={fetchBooks}
          />
        </Modal>
      )}

      {isBookEntryOpen && (
        <Modal isOpen={isBookEntryOpen} onClose={closeBookEntryModal}>
          <BookEntry onClose={closeBookEntryModal} refreshBooks={fetchBooks} />
        </Modal>
      )}

      {isEditBookOpen && bookToEdit && (
        <Modal isOpen={isEditBookOpen} onClose={closeEditBookModal}>
          <EditBook
            isOpen={isEditBookOpen}
            onClose={closeEditBookModal}
            book={bookToEdit}
            refreshBooks={fetchBooks} 
          />
        </Modal>
      )}
    </div>
  );
};

export default BookOfficer;
