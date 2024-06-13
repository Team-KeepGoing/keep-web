import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Uproad from "assets/img/Upload.svg";
import "styles/EditBook.css";
import BookOfficer from "./BookOfficer";
import MainNavbar from "./MainNavbar";

const EditBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book;
  const [editBookDate, setEditBookDate] = useState(
    book ? book.registrationDate : getTodayDate()
  );
  const [bookName, setBookName] = useState(book ? book.title : "");
  const [author, setAuthor] = useState(book ? book.author : "");
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(book ? book.image : null);
  
  useEffect(() => {
    if (!book) {
      setEditBookDate(getTodayDate());
    }
  }, [book]);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  const handleEdit = async (event) => {
    event.preventDefault();

    if (!bookName.trim()) {
      alert("도서명을 입력해주세요.");
      return;
    }

    const data = {
      title: bookName,
      author: author,
      date: editBookDate,
      image: imageDataUrl,
    };

    console.log("Registering device with data:", data);

    try {
      const response = await fetch("http://3.34.2.12:8080/device/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("수정 성공!");
        navigate("/bookOfficer");
      } else {
        console.error("Failed to register device:", response);
        alert("수정 실패!");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/bookOfficer");
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  return (
    <div className="BookEdit">
        
      <div className="BookEditBlur">
        <BookOfficer />
        <MainNavbar />
      </div>
      <div className="BookEditForm">
        <form onSubmit={handleEdit}>
          <p className="BookEditMent">도서 수정</p>
          <div className="EditUproadContainer" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>이미지를 드래그 해 주세요</p>
            ) : (
              <button
                type="button"
                className="EditUploadButton"
                onClick={() => document.getElementById("fileInput").click()}
              >
                이미지 업로드
              </button>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {imageFile && (
              <div>
                <p className="EditimgResultMent">
                  업로드된 이미지: {imageFile.name}
                </p>
              </div>
            )}
            <img src={Uproad} alt="UproadImage" className="EditUproad" />
            <p className="imgMent">image Drag&Drop</p>
          </div>

          <label className="EditTitle">도서명</label>
          <input
            type="text"
            name="title"
            className="EditTitleInput"
            placeholder="제목을 입력하세요."
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <label className="Editauthor">글쓴이</label>
          <input
            type="text"
            name="author"
            className="EditAuthorInput"
            placeholder="글쓴이를 입력하세요."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label className="EditDate">등록일</label>
          <span className="EditDateInput">{editBookDate}</span>

          <button type="submit" className="EditBtn">
            수정
          </button>
          <button
            type="button"
            className="EditCancelBtn"
            onClick={handleCancel}
          >
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
