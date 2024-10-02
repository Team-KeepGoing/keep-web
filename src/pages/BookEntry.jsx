import React, { useState, useCallback } from "react";
import ImageUpload from "../components/bookEntry/ImageUpload";
import TextInput from "../components/bookEntry/TextInput";
import "../styles/BookEntry.css";
import config from "../config/config.json";

const BookEntry = ({ onClose }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    try {
      const response = await fetch(`${config.serverurl}/file/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImgUrl(data.imgUrl);
        console.log("Image Upload Response:", data);
        setIsUploading(false);
        return data.imgUrl;
      } else {
        console.error("Failed to upload image:", response);
        alert("이미지 업로드에 실패했습니다.");
        setIsUploading(false);
        return "";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
      setIsUploading(false);
      return "";
    }
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imgUrl) {
      alert("이미지를 업로드해주세요.");
      return;
    }

    const payload = {
      bookName: bookName,
      writer: author,
      imgUrl: imgUrl,
      nfcCode: "dummy-nfc-code",
      registrationDate: getTodayDate(),
      rentDate: null,
      state: "AVAILABLE",
    };

    try {
      const response = await fetch(`${config.serverurl}/book/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Book registered successfully:", data);
        alert("도서 등록에 성공했습니다.");
        onClose();
      } else {
        console.error("Failed to register book:", response);
        alert("도서 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error registering book:", error);
      alert("도서 등록 중 오류가 발생했습니다.");
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
