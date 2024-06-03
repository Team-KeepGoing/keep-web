import React from "react";
import BookOfficer from "./BookOfficer";
import "styles/BookEntry.css";

const BookEntry = () => {
  return (
    <div className="BookEntry">
      <div className="BookOfficerBlur">
        <BookOfficer />
      </div>
      <div className="BookEntryForm">
        <form>
          <label>
            도서 이름:
            <input type="text" name="title" />
          </label>
          <label>
            등록일:
            <input type="date" name="registrationDate" />
          </label>
          <label>
            대여 여부:
            <select name="availability">
              <option value="대여 가능">대여 가능</option>
              <option value="대여 중">대여 중</option>
            </select>
          </label>
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  );
};

export default BookEntry;
