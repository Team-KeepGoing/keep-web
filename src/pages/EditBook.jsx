import React, { useState, useEffect } from "react";
import "../styles/EditBook.css";
import Modal from "./Modal";

const EditBook = ({ isOpen, onClose, book }) => {
  const [bookName, setBookName] = useState(book.bookName || "");
  const [author, setAuthor] = useState(book.writer || "");
  const [bookDate, setBookDate] = useState(
    new Date(book.registrationDate).toISOString().split("T")[0] || ""
  );
  const [bookImage, setBookImage] = useState(book.imageUrl || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [state, setState] = useState(book.state || "AVAILABLE");

  const handleEditBook = async (e) => {
    e.preventDefault();
    // 도서 수정 로직 추가
  };

  const handleFileInputLabelClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBookImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG, WEBP 파일만 업로드 가능합니다."
        );
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="BookEditForm">
        <div className="BookEditMent">도서 수정</div>
        <div className="BookEditDetailItem">
          <label className="EditTitle">도서 제목</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="BookEditTitleInput"
          />
          <label className="EditAuthor">작가</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="BookEditAuthorInput"
          />
        </div>
        <div className="EntryDetailItem">
          <label className="fileInputLabel" onClick={handleFileInputLabelClick}>
            파일 선택
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleImageChange}
            className="fileInput"
            style={{ display: "none" }}
          />
          {bookImage && (
            <img src={bookImage} alt="Book" className="BookImagePreview" />
          )}
        </div>

        <button onClick={handleEditBook} className="SaveButton">
          수정
        </button>
        <button onClick={onClose} className="EditCancelButton">
          취소
        </button>
      </div>
    </Modal>
  );
};

export default EditBook;
