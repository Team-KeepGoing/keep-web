// ViewBook.js
import React, { useState } from "react";
import "../styles/ViewBook.css";
import Modal from "./Modal";
import EditBook from "./EditBook";

const ViewBook = ({ isOpen, onClose, book }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // EditBook 모달 열기 및 ViewBook 모달 닫기
  const handleEditBook = () => {
    onClose(); // ViewBook 모달 닫기
    setIsEditModalOpen(true);
  };

  // EditBook 모달 닫기
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="ViewBook">
            <div className="ViewForm">
              <div className="ViewMent">도서 정보</div>
              <div className="EntryDetailItem">
                <label className="ViewbookName">도서 제목</label>
                <input
                  type="text"
                  value={book.bookName}
                  className="ViewNameInput"
                  readOnly
                />
              </div>
              <div className="EntryDetailItem">
                <label className="ViewAuthor">작가</label>
                <input
                  type="text"
                  value={book.writer}
                  className="ViewAuthorInput"
                  readOnly
                />
              </div>
              <div className="EntryDetailItem">
                <label className="ViewbookDate">등록일</label>
                <input
                  type="text"
                  value={
                    new Date(book.registrationDate).toISOString().split("T")[0]
                  }
                  className="ViewDateInput"
                  readOnly
                />
              </div>
              <div className="EntryDetailItem">
                {book.imageUrl && (
                  <img
                    src={book.imageUrl}
                    alt="Book"
                    className="BookImagePreview"
                  />
                )}
              </div>
              <button onClick={handleEditBook} className="SaveButton">
                수정
              </button>
              <button onClick={onClose} className="CancelButton">
                취소
              </button>
            </div>
          </div>
        </Modal>
      )}
      {isEditModalOpen && (
        <EditBook
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          book={book}
        />
      )}
    </>
  );
};

export default ViewBook;
