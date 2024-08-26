import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import question from "../assets/img/question.svg";
import "../styles/Device.css";
import MainNavbar from "./MainNavbar";

const Device = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deviceData, setDeviceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    filterDevices();
  }, [searchTerm, deviceData]);

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://15.165.16.79:8080/device/list");
      if (!response.ok) {
        throw new Error("기기 목록을 가져오는데 실패했습니다.");
      }
      const result = await response.json();
      console.log("기기 목록:", result);

      if (result.data && Array.isArray(result.data)) {
        setDeviceData(result.data);
        setFilteredData(result.data);
      } else {
        console.error("데이터가 배열이 아닙니다:", result);
      }
    } catch (error) {
      console.error("기기 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const filterDevices = () => {
    const filtered = deviceData.filter(
      (device) =>
        device.deviceName.includes(searchTerm) ||
        (device.regDate && device.regDate.includes(searchTerm)) ||
        (device.status && device.status.includes(searchTerm))
    );
    setFilteredData(filtered);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedData = [...filteredData];

    if (option === "name") {
      sortedData.sort((a, b) => a.deviceName.localeCompare(b.deviceName));
    } else if (option === "date") {
      sortedData.sort((a, b) => new Date(a.regDate) - new Date(b.regDate));
    }

    setFilteredData(sortedData);
  };

  const handleDeviceRegistration = () => {
    handleNavigation("/DeviceRegistration");
  };

  const handleViewDevice = (device) => {
    navigate("/viewDevice", { state: { device } });
  };

  const formatRegDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const translateStatus = (status) => {
    if (status === "AVAILABLE") return "대여 가능";
    else if (status === "RENTED") return "대여 중";
    else if (status === "INACTIVE") return "대여 불가";
    return status;
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDevice(null);
  };

  return (
    <div className="Device">
      <MainNavbar />
      <img src={logo} alt="logoimage" className="Devicelogo" />
      <div className="Deviceeep" onClick={() => handleNavigation("/")}>
        EEP
      </div>
      <div className="Devicetitle"> 기기 관리하기 </div>
      <div className="DeviceMent">기기 관리를 더욱 쉽게 도와줍니다.</div>
      <img src={buttonBack} alt="buttonBack" className="DevicebuttonBack" />
      <img src={bar} alt="bar" className="Devicebar" />
      <img src={question} alt="questionimage" className="questionimage" />
      <div className="DevicespanTag">
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
      <div className="DeviceSearchWrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="기기 이름을 검색해주세요."
          className="DeviceSearch"
        />

        <div className="SortDropdownWrapper">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="SortDropdown"
          >
            <option value="">정렬</option>
            <option value="name">이름 순</option>
            <option value="date">등록일 순</option>
          </select>
        </div>
      </div>
      <button onClick={handleDeviceRegistration} className="RegisterButton">
        기기 추가하기
      </button>

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
              <tr key={index} onClick={() => handleViewDevice(device)}>
                <td>{index + 1}</td>
                <td>{device.deviceName}</td>
                <td>{formatRegDate(device.regDate)}</td>
                <td>
                  <span
                    style={{
                      color:
                        device.status === "AVAILABLE" ? "#32C000" : "#3182F7",
                    }}
                  >
                    {translateStatus(device.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedDevice && (
        <div className="DeviceModal">
          <div className="DeviceModalContent">
            <div className="DeviceModalHeader">
              <h2>기기 정보</h2>
              <button className="DeviceModalClose" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="DeviceModalBody">
              <div className="DeviceModalItem">
                <label>기기명:</label>
                <input type="text" value={selectedDevice.deviceName} readOnly />
              </div>
              <div className="DeviceModalItem">
                <label>등록일:</label>
                <input
                  type="text"
                  value={formatRegDate(selectedDevice.regDate)}
                  readOnly
                />
              </div>
              {selectedDevice.imgUrl && (
                <div className="DeviceModalItem">
                  <label>기기 이미지:</label>
                  <img
                    src={selectedDevice.imgUrl}
                    alt="Device"
                    className="DeviceModalImage"
                    onError={(e) => {
                      e.target.src = "../assets/img/Upload.svg";
                    }}
                  />
                </div>
              )}
            </div>
            <div className="DeviceModalFooter">
              <button
                onClick={() =>
                  navigate("/editDevice", {
                    state: { device: selectedDevice },
                  })
                }
                className="DeviceModalEditButton"
              >
                수정
              </button>
              <button onClick={closeModal} className="DeviceModalCancelButton">
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Device;
