import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import "styles/ViewBook.css";
import BookOfficer from "./BookOfficer";

const ViewBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state;

  const handleEdit = () => {
    navigate(`/editBook/${book._id}`);
  };

  const translateState = (state) => {
    if (state === "AVAILABLE") return "대여 가능";
    if (state === "RENTED") return "대여 중";
    return state;
  };

  return (
    <div className="ViewBook">
      <div className="BookBlur">
        <BookOfficer />
        <MainNavbar />
      </div>
      <div className="BookDetails">
        <form className="BookForm">
          <img
            src={book.imageUrl}
            alt="Book Cover"
            className="BookCover"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
          <div className="BookInfo">
            <p>
              <strong>도서 제목:</strong> {book.bookName}
            </p>
            <p>
              <strong>글쓴이:</strong> {book.writer}
            </p>
            <p>
              <strong>등록일:</strong>
              {new Date(book.registrationDate).toLocaleDateString("ko-KR")}
            </p>
            <p>
              <strong>대여 여부:</strong> {translateState(book.state)}
            </p>
          </div>
          <button onClick={handleEdit} className="EditButton">
            수정
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewBook;
