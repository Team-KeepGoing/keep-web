import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Uproad from "assets/img/Upload.svg";
import "styles/BookEntry.css";
import BookOfficer from "./BookOfficer";
import MainNavbar from "./MainNavbar";

const BookEntry = () => {
  const [bookEntryDate, setBookEntryDate] = useState(getTodayDate());
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setBookEntryDate(getTodayDate());
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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://15.165.16.79:8080/file/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image Upload Response:", data);
        setImgUrl(data.imgUrl);
        return data.imgUrl;
      } else {
        console.error("Failed to upload image:", response);
        alert("이미지 업로드 실패!");
        return null;
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
      return null;
    }
  };

  const handleRegister = async (event) => {
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

  const handleCancel = () => {
    navigate("/bookOfficer");
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (validTypes.includes(file.type)) {
        await uploadImage(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
    }
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (validTypes.includes(file.type)) {
        await uploadImage(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg, image/webp",
    multiple: false,
  });

  return (
    <div className="BookEntry">
      <BookOfficer />
      <div className="ContentArea">
        <MainNavbar />
        <div className="BookEntryForm">
          <form onSubmit={handleRegister}>
            <p className="BookEntryMent"> 도서 등록 </p>
            <div className="UproadContainer" {...getRootProps()}>
              <input {...getInputProps()} style={{ display: "none" }} />
              {isDragActive ? (
                <p>이미지를 드래그 해 주세요</p>
              ) : (
                !imgUrl && (
                   
                  <span
                    className="UploadMent"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    드래그 앤 드랍 또는 여기를 눌러 업로드
                  </span>
                )
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {imgUrl ? (
                <img src={imgUrl} alt="Uploaded" className="UploadedImg" />
              ) : (
                <img src={Uproad} alt="UproadImage" className="Uproad" />
              )}
            </div>

            <label className="EntryTitle">도서 제목</label>
            <input
              type="text"
              name="title"
              className="TitleInput"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <label className="EntryAuthor">작가</label>
            <input
              type="text"
              name="author"
              className="AuthorInput"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <button type="submit" className="EntryBtn">
              등록
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
    </div>
  );
};

export default BookEntry;
