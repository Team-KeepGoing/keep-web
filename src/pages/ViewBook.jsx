import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewBook.css";
import Modal from "./Modal";

const ViewBook = ({ isOpen, onClose, book }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookImage, setBookImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      setBookName(book.bookName);
      setAuthor(book.writer);
      setBookDate(formatRegistrationDate(book.registrationDate));
      setBookImage(book.imageUrl);
    }
  }, [book]);

  const handleCancel = () => {
    onClose(); // 모달 닫기
  };

  const handleEditBook = () => {
    if (book) {
      navigate("/editBook", { state: { book } });
    }
  };

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="ViewBook">
        <div className="ViewForm">
          <div className="ViewMent">도서 정보</div>
          <div className="EntryDetailItem">
            <label className="ViewbookName">도서 제목</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="ViewNameInput"
              readOnly
            />
          </div>
          <div className="EntryDetailItem">
            <label className="ViewAuthor">작가</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="ViewAuthorInput"
              readOnly
            />
          </div>
          <div className="EntryDetailItem">
            <label className="ViewbookDate">등록일</label>
            <input
              type="text"
              value={bookDate}
              onChange={(e) => setBookDate(e.target.value)}
              className="ViewDateInput"
              readOnly
            />
          </div>
          <div className="EntryDetailItem">
            {bookImage && (
              <img src={bookImage} alt="Book" className="BookImagePreview" />
            )}
          </div>
          <button onClick={handleEditBook} className="SaveButton">
            수정
          </button>
          <button onClick={handleCancel} className="CancelButton">
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewBook;
