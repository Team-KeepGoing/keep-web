import React, { useState } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "assets/img/bar.svg";
import division from "assets/img/divisionBar.svg";
import buttonBack from "../assets/img/buttonBackground.svg"; // 상대 경로 수정
import { useNavigate } from "react-router-dom";
import "styles/Device.css";

const Device = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  // 더미 데이터 생성
  const initialDeviceData = [
    {
      name: "아이패드 01",
      registrationDate: "2024-05-25",
      availability: "대여 가능",
    },
    {
      name: "아이패드 02",
      registrationDate: "2024-05-25",
      availability: "대여 중",
    },
    {
      name: "아이패드 03",
      registrationDate: "2024-05-25",
      availability: "대여 중",
    },
    {
      name: "애플펜슬 01",
      registrationDate: "2024-05-25",
      availability: "대여 가능",
    },
    {
      name: "애플펜슬 02",
      registrationDate: "2024-05-28",
      availability: "대여 중",
    },
    {
      name: "애플펜슬 03",
      registrationDate: "2024-05-25",
      availability: "대여 가능",
    },
    {
      name: "삼성 노트북 01",
      registrationDate: "2024-05-22",
      availability: "대여 가능",
    },
    {
      name: "삼성 노트북 02",
      registrationDate: "2024-05-24",
      availability: "대여 가능",
    },
  ];

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(initialDeviceData);

  // 검색어가 변경될 때마다 필터링
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = initialDeviceData.filter(
        (device) =>
          device.name.includes(term) ||
          device.registrationDate.includes(term) ||
          device.availability.includes(term)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(initialDeviceData);
    }
  };

  return (
    <div className="Device">
      <img src={logo} alt="logoimage" className="Devicelogo" />
      <div className="Deviceeep">EEP</div>
      <div className="Devicetitle"> 기기 관리하기 </div>
      <div className="DeviceMent">기기 관리를 더욱 쉽게 도와줍니다.</div>
      <img src={buttonBack} alt="buttonBack" className="DevicebuttonBack" />
      <img src={bar} alt="bar" className="Devicebar" />
      <img src={division} alt="divisionBar" className="DevicedivisionBar" />
      <div className="DevicespanTag">
        <span
          className="DeviceSignupSpan"
          onClick={() => handleNavigation("/signup")}
        >
          회원가입
        </span>
        <span
          className="DeviceLoginSpan"
          onClick={() => handleNavigation("/signin")}
        >
          로그인
        </span>
        <span className="DevicehomeSpan" onClick={() => handleNavigation("/")}>
          홈
        </span>
        <span
          className="DevicebookOfficerSpan"
          onClick={() => handleNavigation("/bookOfficer")}
        >
          도서 관리
        </span>
        <span
          className="DeviceSpan"
          onClick={() => handleNavigation("/device")}
        >
          기기 관리
        </span>
        <span
          className="DevicestudentInfoSpan"
          onClick={() => handleNavigation("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="DevicecontectSpan"
          onClick={() => handleNavigation("/Emergency")}
        >
          비상 연락처
        </span>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="기기 이름을 검색해주세요."
        className="DeviceSearch"
      />
      <div className="DeviceTable">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>기기 이름</th>
              <th>등록일</th>
              <th>대여 여부</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((device, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{device.name}</td>
                <td>{device.registrationDate}</td>
                <td>{device.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Device;
