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
    </div>
  );
};

export default EditForm;
