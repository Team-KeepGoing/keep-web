import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Uproad from "../assets/img/Upload.svg";
import "../styles/BookEntry.css";
import config from "../config/config.json";

const BookEntry = ({ onClose }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 이미지 업로드 함수
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

  // 파일 드롭 핸들러
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        uploadImage(acceptedFiles[0]);
      }
    },
    [uploadImage]
  );

  // 드롭존 설정
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  // 현재 날짜 가져오기 함수
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString(); // ISO 형식으로 날짜 반환
  };

  // 폼 제출 핸들러
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
          {isUploading && <p>이미지 업로드 중...</p>}
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
