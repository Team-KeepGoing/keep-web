import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import config from "../config/config.json";
import MainNavbar from "./MainNavbar"; 
import Header from "../components/Header"; 
import Uproad from "../assets/img/Upload.svg"; 

const Emergency = () => {
  const location = useLocation();
  const { searchResults: initialSearchResults } = location.state || {
    searchResults: [],
  };
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    id: "",
    studentName: "",
    studentId: "",
    phoneNum: "",
    address: "",
    mail: "",
    imgUrl: "",
  });
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(initialSearchResults);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${config.serverurl}/student/all`);
        const data = await response.json();
        setStudents(data.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = () => {
    const filteredStudents = students.filter((student) => {
      const studentGrade = parseInt(student.studentId.charAt(0));
      const studentClass = parseInt(student.studentId.charAt(1));
      const studentNumber = parseInt(student.studentId.slice(2));

      const isGradeMatch =
        selectedGrade === null || studentGrade === selectedGrade;
      const isClassMatch =
        selectedClass === null || studentClass === selectedClass;
      const isNumberMatch =
        selectedNumber === null || studentNumber === selectedNumber;
      const isNameMatch = student.studentName.includes(searchQuery);

      return isNameMatch && isGradeMatch && isClassMatch && isNumberMatch;
    });

    setSearchResults(filteredStudents.length > 0 ? filteredStudents : []);
    alert(filteredStudents.length > 0 ? "검색 성공!" : "검색 결과가 없습니다.");
  };

  const uploadImage = async (file) => {
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
        setModalInfo((prevState) => ({ ...prevState, imgUrl: data.imgUrl }));
      } else {
        alert("이미지 업로드 실패!");
      }
    } catch (error) {
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleEmergency = async (id) => {
    const data = {
      studentName: modalInfo.studentName,
      studentId: modalInfo.studentId,
      phoneNum: modalInfo.phoneNum,
      imgUrl: modalInfo.imgUrl,
      address: modalInfo.address,
      mail: modalInfo.mail,
    };

    try {
      const response = await fetch(`${config.serverurl}/student/edit/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("학생 정보 수정 성공!");
        setShowModal(false);
        const updatedStudents = await fetch(
          `${config.serverurl}/student/all`
        ).then((res) => res.json());
        setStudents(updatedStudents.data);
      } else {
        alert("학생 정보 수정 실패!");
      }
    } catch (error) {
      alert("학생 정보 수정 중 오류가 발생했습니다.");
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      await uploadImage(file);
    } else {
      alert(
        "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg",
    multiple: false,
  });

  const openModalHandler = (student) => {
    setShowModal(true);
    setModalInfo({
      ...student,
      studentId: formatStudentId(student.studentId),
      address: student.address || "대구소프트웨어마이스터고",
    });
  };

  const formatStudentId = (studentId) => {
    const grade = parseInt(studentId.charAt(0));
    const classNum = parseInt(studentId.charAt(1));
    const number = parseInt(studentId.slice(2));
    return `${grade}학년 ${classNum}반 ${number}번`;
  };

  const handleResetFilters = () => {
    setSelectedGrade(null);
    setSelectedClass(null);
    setSelectedNumber(null);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="Emergency">
      <MainNavbar />
      <div className="Emergencyment">비상연락처</div>
      {showModal && (
        <div className="EmergencyModalBg" onClick={() => setShowModal(false)}>
          <div className="EmergencyModal" onClick={(e) => e.stopPropagation()}>
            <p className="EmergencyModalTitle">학생 정보</p>
            <div className="EmergencyModalContent">
              <div className="EmergencyModalUpload" {...getRootProps()}>
                <input {...getInputProps()} style={{ display: "none" }} />
                {isDragActive ? (
                  <p>이미지를 드래그 해 주세요</p>
                ) : (
                  !modalInfo.imgUrl && (
                    <span
                      className="UploadMent"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      드래그 앤 드랍 <br /> 또는 여기를 눌러 업로드
                    </span>
                  )
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  style={{ display: "none" }}
                  onChange={(e) => onDrop(e.target.files)}
                />
                {modalInfo.imgUrl ? (
                  <img
                    src={modalInfo.imgUrl}
                    alt="Uploaded"
                    className="UploadedImg"
                  />
                ) : (
                  <img src={Uproad} alt="UproadImage" className="Uproad" />
                )}
              </div>
              <div className="EmergencyModalContentRight">
                {[
                  "studentName",
                  "studentId",
                  "phoneNum",
                  "address",
                  "mail",
                ].map((field, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      className={`EmergencyModalContentText${index + 1}`}
                      value={modalInfo[field]}
                      onChange={(e) =>
                        setModalInfo({ ...modalInfo, [field]: e.target.value })
                      }
                      disabled={!isUpload && field !== "mail"}
                    />
                  </div>
                ))}
                <button
                  className="EmergencyModalContentButton"
                  onClick={() => setIsUpload(true)}
                  disabled={isUpload}
                >
                  학생 정보 수정
                </button>
                {isUpload && (
                  <div className="flex">
                    <button
                      type="button"
                      className="EmergencyAdd"
                      onClick={() => handleEmergency(modalInfo.id)}
                    >
                      등록
                    </button>
                    <button
                      type="button"
                      className="EmergencyCancel"
                      onClick={() => setShowModal(false)}
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Header />
      <div className="EmergencySelect">
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(parseInt(e.target.value))}
        >
          <option value="">학년</option>
          {Array.from({ length: 3 }, (_, i) => i + 1).map((grade) => (
            <option key={grade} value={grade}>
              {grade}학년
            </option>
          ))}
        </select>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(parseInt(e.target.value))}
        >
          <option value="">반</option>
          {Array.from({ length: 4 }, (_, i) => i + 1).map((classNum) => (
            <option key={classNum} value={classNum}>
              {classNum}반
            </option>
          ))}
        </select>
        <select
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
        >
          <option value="">번호</option>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}번
            </option>
          ))}
        </select>
        <input
          type="text"
          className="EmergencySearch"
          placeholder="이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="EmergencySearchButton" onClick={handleSearch}>
          검색
        </button>
        <button className="EmergencyResetButton" onClick={handleResetFilters}>
          필터 초기화
        </button>
      </div>
      <div className="EmergencyList">
        {searchResults.map((student) => (
          <Card
            key={student.id}
            student={student}
            onClick={() => openModalHandler(student)}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ studentName, studentId, imgUrl, openModal }) => {
  return (
    <div className="EmergencyCard" onClick={openModal}>
      <div className="EmergencyCardCircle" />
      {imgUrl ? (
        <img src={imgUrl} alt="Student" className="EmergencyCardImage" />
      ) : (
        <div className="EmergencyCardImage" />
      )}
      <div className="EmergencyCardName">{studentName}</div>
      <div className="EmergencyCardNumber">{studentId}</div>
    </div>
  );
};

export default Emergency;
