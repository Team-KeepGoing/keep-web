import React, { useState, useRef } from "react";
import "../styles/EditBook.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import config from "../config/config.json";
import FileInput from "../components/editBook/FileInput";
import ImagePreview from "../components/editBook/ImagePreview";
import EditForm from "../components/editBook/EditForm";

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

  const nfcCode = book.nfcCode;

  const fileInputRef = useRef(null);
  const handleEditBook = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: bookName,
        nfcCode: nfcCode,
        imageUrl: bookImage,
        state: state,
      };

      const response = await fetch(`${config.serverurl}/book/edit/${nfcCode}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("도서 정보가 성공적으로 수정되었습니다.");
        onClose();
        navigate("/bookOfficer");
      } else {
        alert("도서 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("도서 수정 중 오류가 발생했습니다.");
    }
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
        alert("PNG, JPG, JPEG, WEBP 파일만 업로드 가능합니다.");
      }
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `${config.serverurl}/book/del/${nfcCode}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("삭제되었습니다.");
          onClose();
          navigate("/bookOfficer");
        } else {
          alert("도서 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("도서 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="BookEditForm">
        <div className="BookEditMent">도서 수정</div>
        <EditForm
          bookName={bookName}
          setBookName={setBookName}
          author={author}
          setAuthor={setAuthor}
        />
        <FileInput onImageChange={handleImageChange} />
        <ImagePreview bookImage={bookImage} />
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
