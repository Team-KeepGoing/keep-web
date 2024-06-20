import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewBook.css";
import BookOfficer from "./BookOfficer";
import MainNavbar from "./MainNavbar";

const ViewDevice = () => {
  const [DeviceDate, setDeviceDate] = useState(getTodayDate());
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDeviceDate(getTodayDate());
  }, []);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  const handleRegister = (event) => {
    event.preventDefault();

    if (!bookName.trim()) {
      alert("도서 제목을 입력해주세요.");
      return;
    }

    if (!author.trim()) {
      alert("작가를 입력해주세요.");
      return;
    }

    alert("도서 등록이 완료되었습니다!");
  };

  const handleCancel = () => {
    navigate("/bookOfficer");
  };

  return (
    <div className="BookEntry">
      <div className="BookOfficerBlur">
        <MainNavbar />
        <BookOfficer />
      </div>
      <div className="BookEntryForm">
        <form onSubmit={handleRegister}>
          <p className="BookEntryMent"> 도서 정보 </p>
          <label className="EntryTitle">도서 제목</label>
          <input
            type="text"
            name="title"
            className="TitleInput"
            placeholder="제목을 입력하세요."
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <label className="EntryAuthor">작가</label>
          <input
            type="text"
            name="author"
            className="AuthorInput"
            placeholder="글쓴이를 입력하세요."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label className="EntryDate">등록일</label>
          <span className="DateInput">{DeviceDate}</span>

          <button type="submit" className="EntryBtn">
            수정
          </button>
          <button
            type="button"
            className="EntryCancelBtn"
            onClick={handleCancel}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewDevice;
