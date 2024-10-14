import React, { useState, useCallback } from "react";
import ImageUpload from "../components/bookEntry/ImageUpload";
import TextInput from "../components/bookEntry/TextInput";
import "../styles/BookEntry.css";
import config from "../config/config.json";
import { useNavigate } from "react-router-dom";

const BookEntry = ({ onClose }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${config.serverurl}/file/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImgUrl(data.imgUrl);
        return data.imgUrl;
      } else {
        console.error("Failed to upload image:", response);
        return "";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bookName.trim()) {
      alert("도서 제목을 입력해주세요.");
      return;
    }

    if (!author.trim()) {
      alert("작가를 입력해주세요.");
      return;
    }

    const data = {
      bookName: bookName,
      writer: author,
      state: "AVAILABLE",
      imageUrl: imgUrl,
    };

    try {
      const response = await fetch("http://15.165.16.79:8080/book/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("등록 성공!");
        onClose(); // 모달 닫기
        navigate("/bookOfficer");
      } else {
        console.error("Failed to register book:", response);
        alert("등록 실패!");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="BookEntry">
      <div className="BookEntryMent">도서 등록</div>
      <div className="BookEntryForm">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="도서명"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            inputClassName="TitleInput"
            labelClassName="EntryTitle"
          />
          <TextInput
            label="작가"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            inputClassName="AuthorInput"
            labelClassName="EntryAuthor"
          />
          <ImageUpload
            onUpload={uploadImage}
            isUploading={isUploading}
            imgUrl={imgUrl}
          />
          <div className="BookEntryButtons">
            <button type="submit" className="EntryBtn">
              등록
            </button>
            <button type="button" className="EntryCancelBtn" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEntry;
