import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import BookOfficer from "./BookOfficer";
import "../styles/EditBook.css";

const EditBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [nfcCode, setNfcCode] = useState("");
  const [state, setState] = useState("AVAILABLE");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.book) {
      const { book } = location.state;
      setBookName(book.bookName);
      setAuthor(book.writer);
      setBookDate(formatRegistrationDate(book.registrationDate));
      setBookImage(book.imageUrl);
      setNfcCode(book.nfcCode);
      setState(book.state);
    }
  }, [location.state]);

  const handleEditBook = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = bookImage;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const bookData = {
        name: bookName,
        writer: author,
        registrationDate: bookDate,
        imageUrl: imageUrl,
        state: state,
        nfcCode: nfcCode,
      };

      const response = await fetch(
        `http://3.34.2.12:8080/book/edit/${nfcCode}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (response.ok) {
        console.log("Book updated successfully!");
        navigate("/bookOfficer");
      } else {
        console.error("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `http://3.34.2.12:8080/book/del/${nfcCode}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Book deleted successfully!");
          navigate("/bookOfficer");
        } else {
          console.error("Failed to delete book");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setBookImage(URL.createObjectURL(file));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://3.34.2.12:8080/file/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.imageUrl;
    } else {
      throw new Error("Failed to upload image");
    }
  };

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  return (
    <div className="BookEditBlur">
      <MainNavbar />
      <BookOfficer />
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
        </div>
        <div className="EntryDetailItem">
          <label className="BookEditAuthor">작가</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="BookEditAuthorInput"
          />
        </div>
        <div className="EntryDetailItem">
          <label
            className="fileInputLabel"
            onClick={() => document.getElementById("fileInput").click()}
          >
            파일 선택
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleImageChange}
            className="fileInput"
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
    </div>
  );
};

export default EditBook;
