import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ViewBook.css";
import MainNavbar from "./MainNavbar";
import BookOfficer from "./BookOfficer";

const ViewBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookImage, setBookImage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.book) {
      const { book } = location.state;
      setBookName(book.bookName);
      setAuthor(book.writer);
      setBookDate(formatRegistrationDate(book.registrationDate));
      setBookImage(book.imageUrl);
    }
  }, [location.state]);

  const handleCancel = () => {
    navigate("/bookOfficer");
  };

  const handleEditBook = () => {
    if (location.state && location.state.book) {
      navigate("/editBook", { state: { book: location.state.book } });
    }
  };

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="BookEntry">
      <BookOfficer />
      <MainNavbar />
      <div className="BookEntryForm">
        <div className="BookEntryMent">도서 정보</div>
        <div className="EntryDetailItem">
          <label className="EntryTitle">도서 제목</label>
          <div className="ViewbookName">{bookName}</div>
        </div>
        <div className="EntryDetailItem">
          <label className="EntryAuthor">작가</label>
          <div className="ViewAuthor">{author}</div>
        </div>
        <div className="EntryDetailItem">
          <label className="EntryDate">등록일</label>
          <div className="ViewbookDate">{bookDate}</div>
        </div>
        <div className="EntryDetailItem">
          <div className="EntryValue">
            {bookImage ? (
              <img src={bookImage} alt="Book Cover" className="BookImage" />
            ) : (
              <div>No Image Available</div>
            )}
          </div>

          <div className="ButtonContainer">
            <button
              type="button"
              className="EntryCancelBtn"
              onClick={handleCancel}
            >
              취소
            </button>
            <button onClick={handleEditBook}>수정</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
