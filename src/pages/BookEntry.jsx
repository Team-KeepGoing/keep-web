import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Uproad from "../assets/img/Upload.svg";
import "../styles/BookEntry.css";

const BookEntry = ({ onClose }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://15.165.16.79:8080/file/upload", {
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        uploadImage(acceptedFiles[0]);
      }
    },
    [uploadImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      bookName: bookName,
      writer: author,
      imgUrl: imgUrl,
    };

    try {
      const response = await fetch("http://15.165.16.79:8080/book/register", {
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
      }
    } catch (error) {
      console.error("Error registering book:", error);
    }
  };

  return (
    <div className="BookEntry">
      <div className="BookEntryMent">도서 등록</div>
      <div className="BookEntryForm">
        <form onSubmit={handleSubmit}>
          <div className="BookEntryField">
            <label className="EntryTitle">도서명:</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
              className="TitleInput"
            />
          </div>
          <div className="BookEntryField">
            <label className="EntryAuthor">작가:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="AuthorInput"
            />
          </div>
          <div className="BookEntryField">
            <label className="BookEntryyMent">도서 등록</label>
            <div {...getRootProps()} className="UproadContainer">
              <input {...getInputProps()} />
              <img src={Uproad} alt="Upload Icon" className="Uproad" />
              <p className="UploadMent">
                드래그 앤 드랍 <br />
                또는 여기를 눌러 업로드
              </p>
            </div>
          </div>
          {imgUrl && (
            <div className="UploadedImg">
              <img src={imgUrl} alt="Preview" />
            </div>
          )}
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
