import React, { useState, useEffect, useCallback } from "react";
import logo from "../assets/img/Guideslogo.svg";
import { useDropzone } from "react-dropzone";
import Uproad from "assets/img/Upload.svg";
import bar from "assets/img/bar.svg";
import buttonBack from "assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import "styles/Emergency.css";
import MainNavbar from "./MainNavbar";

const Emergency = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [imgUrl, setImgUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isUpload, setIsUpload] = useState(false)
  const [modalInfo, setModalInfo] = useState({
    studentName: "",
    studentId: "",
    phoneNum: "",
    address: "",
    mail: "",
  });
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("http://15.165.16.79:8080/student/all")
      .then((response) => response.json())
      .then((data) => setStudents(data.data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = () => {
    const filteredStudents = students.filter((student) => {
      const studentGrade = parseInt(student.studentId.substring(0, 1));
      const studentClass = parseInt(student.studentId.substring(1, 2));
      const studentNumber = parseInt(student.studentId.substring(2));

      return (
        student.studentName.includes(searchQuery) &&
        studentGrade === selectedGrade &&
        studentClass === selectedClass &&
        studentNumber === selectedNumber
      );
    });

    if (filteredStudents.length > 0) {
      setSearchResults(filteredStudents);
    } else {
      alert("검색 결과가 없습니다.");
      setSearchResults([]);
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

  const handleEmergency = async (studentId) => {
    const data = {
      studentName: modalInfo.studentName,
      studentId: modalInfo.studentId,
      phoneNum: modalInfo.phoneNum,
      imgUrl: imgUrl,
      address: modalInfo.address,
      mail: modalInfo.mail
    };
    try {
      const response = await fetch(`http://15.165.16.79:8080/student/edit/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("학생 정보 수정 성공!");
        setShowModal(false);
        // 학생 목록 새로고침
        const updatedStudents = await fetch("http://15.165.16.79:8080/student/all").then(res => res.json());
        setStudents(updatedStudents.data);
      } else {
        console.error("Failed to update student info:", response);
        alert("학생 정보 수정 실패!");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("학생 정보 수정 중 오류가 발생했습니다.");
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(file.type)) {
        await uploadImage(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg",
    multiple: false,
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(file.type)) {
        await uploadImage(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
    }
  };

  const clickUploadHandler = () => {
    setIsUpload(!isUpload);
  };

  const handleCancel = () => {
    setIsUpload(false);
    setShowModal(false);
  };

  return (
    <div className="Emergency">
      <MainNavbar />
      <img src={logo} alt="logoimage" className="Emergencylogo" />
      <div className="Emergencyeep" onClick={() => handleNavigation("/")}>
        EEP
      </div>
      <div className="Emergencyment">비상연락처</div>
      {showModal ? (
        <div
          className="EmergencyModalBg"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="EmergencyModal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="EmergencyModalTitle">학생 정보</p>
            <div className="EmergencyModalContent">
              {isUpload && (
                <div className="EmergencyModalUpload">
                  <div className="UproadContainer" {...getRootProps()}>
                    <input {...getInputProps()} style={{ display: "none" }} />
                    {isDragActive ? (
                      <p>이미지를 드래그 해 주세요</p>
                    ) : (
                      !imgUrl && (
                        <span
                          className="UploadMent"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
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
                </div>
              )}
              <div className="EmergencyModalContentRight">
                <div className="EmergencyModalContentTitle">
                  <input 
                    type="text" 
                    value={modalInfo.studentName}
                    onChange={(e) => setModalInfo({...modalInfo, studentName: e.target.value})}
                  />
                </div>
                <div className="EmergencyModalContentText">
                  <input 
                    type="text" 
                    value={modalInfo.studentId}
                    onChange={(e) => setModalInfo({...modalInfo, studentId: e.target.value})}
                  />
                </div>
                <div className="EmergencyModalContentText1">
                  <input 
                    type="text" 
                    value={modalInfo.phoneNum}
                    onChange={(e) => setModalInfo({...modalInfo, phoneNum: e.target.value})}
                  />
                </div>
                <div className="EmergencyModalContentText2">
                  <input 
                    type="text" 
                    value={modalInfo.address}
                    onChange={(e) => setModalInfo({...modalInfo, address: e.target.value})}
                  />
                </div>
                <div className="EmergencyModalContentText3">
                  <input 
                    type="text" 
                    value={modalInfo.mail}
                    onChange={(e) => setModalInfo({...modalInfo, mail: e.target.value})}
                  />
                </div>
                {!isUpload ? (
                  <button className="EmergencyModalContentButton" onClick={clickUploadHandler}>
                    학생 정보 수정
                  </button>
                ) : (
                  <div className="flex">
                    <button type="submit" className="EmergencyAdd" onClick={() => handleEmergency(modalInfo.id)}>
                      등록
                    </button>
                    <button
                      type="button"
                      className="EmergencyCancel"
                      onClick={handleCancel}
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <img src={buttonBack} alt="buttonBack" className="EmergencybuttonBack" />
      <div className="Emergencyment2">손쉽게 학생 정보를 확인하세요.</div>
      <div className="EmergencyContent">
        <div className="EmergencyGrid">
          {(searchResults.length > 0 ? searchResults : students).map((student) => (
            <Card
              key={student.id}
              studentName={student.studentName}
              studentId={student.studentId}
              openModal={() => {
                setShowModal(true);
                setModalInfo({
                  ...student,
                  address: student.address || "대소고",
                });
              }}
            />
          ))}
        </div>
        <div className="EmergencyFilter">
          <div className="EmergencyFilterTop">
            <p className="EmergencyFilterTitle">필터</p>
            <button
              className="EmergencyFilterReset"
              onClick={() => {
                setSelectedGrade(1);
                setSelectedClass(1);
                setSelectedNumber(1);
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              초기화
            </button>
          </div>
          <input
            className="EmergencyFilterSearch"
            placeholder="이름을 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="EmergencyFilterSection">
            <p className="EmergencyFilterSectionTitle">학년</p>
            <div className="EmergencyFilterSectionButtonWrapper">
              {[1, 2, 3].map((el) => (
                <button
                  className={`EmergencyFilterSectionButton${
                    el === selectedGrade ? "Active" : ""
                  }`}
                  key={el}
                  onClick={() => setSelectedGrade(el)}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          <div className="EmergencyFilterSection">
            <p className="EmergencyFilterSectionTitle">반</p>
            <div className="EmergencyFilterSectionButtonWrapper">
              {[1, 2, 3, 4].map((el) => (
                <button
                  className={`EmergencyFilterSectionButton${
                    el === selectedClass ? "Active" : ""
                  }`}
                  key={el}
                  onClick={() => setSelectedClass(el)}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          <div className="EmergencyFilterSection">
            <p className="EmergencyFilterSectionTitle">번호</p>
            <select
              className="EmergencyFilterSectionSelect"
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                (el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                )
              )}
            </select>
          </div>
          <button className="EmergencyFilterButton" onClick={handleSearch}>검색</button>
        </div>
      </div>
      <img src={bar} alt="bar" className="Emergencybar" />
      <div className="EmergencyspanTag">
        <span
          className="EmergencyhomeSpan"
          onClick={() => handleNavigation("/")}
        >
          홈
        </span>
        <span
          className="EmergencybookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서 관리
        </span>
        <span
          className="EmergencyDeviceSpan"
          onClick={() => handleNavigation("/device")}
        >
          기기 관리
        </span>
        <span
          className="EmergencystudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="EmergencySpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
      </div>
    </div>
  );
};

export default Emergency;

const Card = ({ studentName, studentId, openModal }) => {
  return (
    <div className="EmergencyCard" onClick={openModal}>
      <div className="EmergencyCardCircle" />
      <div className="EmergencyCardImage" />
      <div className="EmergencyCardName">{studentName}</div>
      <div className="EmergencyCardNumber">{studentId}</div>
    </div>
  );
};