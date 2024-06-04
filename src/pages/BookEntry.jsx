import React, { useState, useEffect } from "react";
import BookOfficer from "./BookOfficer";
import Uproad from "assets/img/Upload.svg";
import "styles/BookEntry.css";

const BookEntry = () => {
  const [registrationDate, setRegistrationDate] = useState(getTodayDate());

  useEffect(() => {
    setRegistrationDate(getTodayDate());
  }, []);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Prefix 0 if month or day is single digit
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="BookEntry">
      <div className="BookOfficerBlur">
        <BookOfficer />
      </div>
      <div className="BookEntryForm">
        <form>
          <p className="BookEntryMent"> 도서 등록 </p>
          <div className="UproadContainer">
            {" "}
            <img src={Uproad} alt="UproadImage" className="Uproad" />
          </div>

          <label className="EntryTitle">제목</label>
          <input type="text" name="title" className="TitleInput" placeholder="제목을 입력하세요." />

          <label className="EntryDate">등록일</label>
          <span className="DateInput">{registrationDate}</span>

          <button className="EntryBtn">등록</button>
          <button className="EntryCancelBtn">취소</button>
        </form>
      </div>
    </div>
  );
};

export default BookEntry;
