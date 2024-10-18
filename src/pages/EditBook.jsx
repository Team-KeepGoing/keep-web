import React, { useState } from "react";
import "../styles/EditBook.css";
import Modal from "./Modal";
import config from "../config/config.json";
import FileInput from "../components/editBook/FileInput";
import ImagePreview from "../components/editBook/ImagePreview";
import EditForm from "../components/editBook/EditForm";

const EditBook = ({ isOpen, onClose, book, refreshBooks }) => {
  const [bookName, setBookName] = useState(book.bookName || "");
  const [author, setAuthor] = useState(book.writer || "");
  const [bookDate, setBookDate] = useState(
    new Date(book.registrationDate).toISOString().split("T")[0] || ""
  );
  const [bookImage, setBookImage] = useState(book.imageUrl || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [state, setState] = useState(book.state || "AVAILABLE");

  const nfcCode = book.nfcCode;

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${config.serverurl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        return result.imageUrl;
      } else {
        console.error("Failed to upload image");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
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

  const handleEditBook = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = bookImage;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) {
          alert("이미지 업로드 중 오류가 발생했습니다.");
          return;
        }
      }

      const bookData = {
        name: bookName,
        writer: author,
        registrationDate: bookDate,
        imageUrl: imageUrl,
        state: state,
        nfcCode: nfcCode,
      };

      const response = await fetch(`${config.serverurl}/book/edit/${nfcCode}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        alert("수정 완료!");
        console.log("Book updated successfully!");
        onClose();
        await refreshBooks();
      } else {
        console.error("Failed to update book");
        alert("도서 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("도서 수정 중 오류가 발생했습니다.");
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
          console.log("Book deleted successfully!");
          onClose();
          await refreshBooks();
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
        <EditForm bookName={bookName} setBookName={setBookName} />
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
