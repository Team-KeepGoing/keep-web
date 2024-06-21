import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BookEntry.css";
import MainNavbar from "./MainNavbar";

const EditBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleEditBook = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("bookName", bookName);
      formData.append("writer", author);
      formData.append("registrationDate", bookDate);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await fetch(
        `http://3.34.2.12:8080/book/update/${location.state.book.id}`,
        {
          method: "PUT",
          body: formData,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setBookImage(URL.createObjectURL(file));
  };

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="BookEntry">
      <MainNavbar />
      <div className="BookEntryForm">
        <div className="BookEntryMent">도서 정보 수정</div>
        <div className="EntryDetailItem">
          <label className="EntryLabel">제목</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="EntryInput"
          />
        </div>
        <div className="EntryDetailItem">
          <label className="EntryLabel">글쓴이</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="EntryInput"
          />
        </div>
        <div className="EntryDetailItem">
          <label className="EntryLabel">등록일</label>
          <input
            type="date"
            value={bookDate}
            onChange={(e) => setBookDate(e.target.value)}
            className="EntryInput"
          />
        </div>
        <div className="EntryDetailItem">
          <label className="EntryLabel">도서 이미지</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="EntryInput"
          />
          {bookImage && (
            <img src={bookImage} alt="Book" className="BookImagePreview" />
          )}
        </div>
        <button onClick={handleEditBook} className="SaveButton">
          저장
        </button>
        <button onClick={handleCancel} className="CancelButton">
          취소
        </button>
      </div>
    </div>
  );
};

export default EditBook;
