import React from "react";

const EditForm = ({ bookName, setBookName, author, setAuthor }) => {
  return (
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
  );
};

export default EditForm;
