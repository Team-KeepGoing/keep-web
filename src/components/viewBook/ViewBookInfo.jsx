import React from "react";

const ViewBookInfo = ({ book }) => {
  return (
    <>
      <div className="EntryDetailItem">
        <label className="ViewbookName">도서 제목</label>
        <input
          type="text"
          value={book.bookName}
          className="ViewNameInput"
          readOnly
        />
      </div>
      <div className="EntryDetailItem">
        <label className="ViewAuthor">작가</label>
        <input
          type="text"
          value={book.writer}
          className="ViewAuthorInput"
          readOnly
        />
      </div>
      <div className="EntryDetailItem">
        <label className="ViewbookDate">등록일</label>
        <input
          type="text"
          value={new Date(book.registrationDate).toISOString().split("T")[0]}
          className="ViewDateInput"
          readOnly
        />
      </div>
    </>
  );
};

export default ViewBookInfo;
