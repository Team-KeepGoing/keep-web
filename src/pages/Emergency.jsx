import React, { useState, useEffect, useCallback } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import { useNavigate } from "react-router-dom";
import config from "../config/config.json";
import "../styles/Emergency.css";
import Header from "../components/Header";
import MainNavbar from "./MainNavbar";
import EmergencyCard from "../components/emergency/EmergencyCard";
import EmergencyFilter from "../components/emergency/EmergencyFilter";
import EmergencyModal from "../components/emergency/EmergencyModal";

const Emergency = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedNumber, setSelectedNumber] = useState(1);
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
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(`${config.serverurl}/student/all`)
      .then((response) => response.json())
      .then((data) => setStudents(data.data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

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
        headers: {
          "Content-Type": "application/json",
        },
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
        console.error("Failed to update student info:", response);
        alert("학생 정보 수정 실패!");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("학생 정보 수정 중 오류가 발생했습니다.");
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (validTypes.includes(file.type)) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch(`${config.serverurl}/upload`, {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          setModalInfo({ ...modalInfo, imgUrl: data.imgUrl });
        } else {
          alert(
            "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
          );
        }
      }
    },
    [modalInfo]
  );

  return (
    <>
      <Header
        logo={logo}
        bar={bar}
        buttonBack={buttonBack}
        styles={{
          headerContainer: "EmergencyHeaderContainer",
          buttonBack: "EmergencybuttonBack",
          homeSpan: "EmergencyhomeSpan",
          bookOfficerSpan: "EmergencybookOfficerSpan",
          deviceSpan: "EmergencyDeviceSpan",
          studentInfoSpan: "EmergencystudentInfoSpan",
          emergencySpan: "EmergencySpan",
        }}
      />
      <MainNavbar />
      <div className="EmergencyContainer">
        <EmergencyFilter
          selectedGrade={selectedGrade}
          selectedClass={selectedClass}
          selectedNumber={selectedNumber}
          setSelectedGrade={setSelectedGrade}
          setSelectedClass={setSelectedClass}
          setSelectedNumber={setSelectedNumber}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <div className="EmergencyCardContainer">
          {searchResults.length > 0
            ? searchResults.map((student) => (
                <EmergencyCard
                  key={student.id}
                  student={student}
                  setShowModal={setShowModal}
                  setModalInfo={setModalInfo}
                  setIsUpload={setIsUpload}
                />
              ))
            : students.map((student) => (
                <EmergencyCard
                  key={student.id}
                  student={student}
                  setShowModal={setShowModal}
                  setModalInfo={setModalInfo}
                  setIsUpload={setIsUpload}
                />
              ))}
        </div>
      </div>
      {showModal && (
        <EmergencyModal
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
          setShowModal={setShowModal}
          handleEmergency={handleEmergency}
          isUpload={isUpload}
          setIsUpload={setIsUpload}
          onDrop={onDrop}
        />
      )}
    </>
  );
};

export default Emergency;
