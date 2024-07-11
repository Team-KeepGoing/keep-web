import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import BookOfficer from "./BookOfficer";
import "../styles/EditBook.css";

const EditBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [nfcCode, setNfcCode] = useState("");
  const [state, setState] = useState("AVAILABLE");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.book) {
      const { book } = location.state;
      setBookName(book.bookName);
      setAuthor(book.writer);
      setBookDate(formatRegistrationDate(book.registrationDate));
      setBookImage(book.imageUrl);
      setNfcCode(book.nfcCode);
      setState(book.state);
    }
  }, [location.state]);

  const handleEditBook = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = bookImage;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
        if (!imageUrl) {
          alert("이미지 업로드 중 오류가 발생했습니다.");
          return;
        }
      }

      const bookData = {
        name: bookName,
        writer: author,
        registrationDate: bookDate,
        imageUrl: imageUrl,
        state: state,
        nfcCode: nfcCode, 
      };

      const response = await fetch(
        `http://15.165.16.79:8080/book/edit/${nfcCode}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (response.ok) {
        alert("수정 완료!");
        console.log("Book updated successfully!");
        navigate("/bookOfficer");
      } else {
        console.error("Failed to update book");
        alert("도서 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("도서 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `http://15.165.16.79:8080/book/del/${nfcCode}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("삭제되었습니다.");
          console.log("Book deleted successfully!");
          navigate("/bookOfficer");
        } else {
          console.error("Failed to delete book");
          alert("도서 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("도서 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleFileInputLabelClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBookImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG, WEBP 파일만 업로드 가능합니다."
        );
      }
    }
  };

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

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="BookEditBlur">
      <div className="ContentArea">
        <BookOfficer />
        <div className="BookEditForm">
          <div className="BookEditMent">도서 수정</div>
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
          <div className="EntryDetailItem">
            <label
              className="fileInputLabel"
              onClick={handleFileInputLabelClick}
            >
              파일 선택
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleImageChange}
              className="fileInput"
              style={{ display: "none" }}
            />
            {bookImage && (
              <img src={bookImage} alt="Book" className="BookImagePreview" />
            )}
          </div>

          <button onClick={handleEditBook} className="SaveButton">
            수정
          </button>
          <button onClick={handleDeleteBook} className="EditCancelButton">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
