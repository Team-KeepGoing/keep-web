import React, { useState } from "react";
import "../styles/EditBook.css";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // nfcCode를 book에서 가져옵니다.
  const nfcCode = book.nfcCode;

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

  const handleDeleteBook = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `http://15.165.16.79:8080/book/del/${nfcCode}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("삭제되었습니다.");
          console.log("Book deleted successfully!");
          onClose();
          navigate("/bookOfficer");
        } else {
          console.error("Failed to delete book");
          alert("도서 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("도서 삭제 중 오류가 발생했습니다.");
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
        <button onClick={handleDeleteBook} className="EditCancelButton">
          삭제
        </button>
      </div>
    </Modal>
  );
};

export default EditBook;
