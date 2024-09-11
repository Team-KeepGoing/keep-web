import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import question from "../assets/img/question.svg";
import "../styles/Device.css";
import MainNavbar from "./MainNavbar";
import ViewDevice from "./ViewDevice";
import Modal from "./Modal";
import Registration from "./Registration"; 
import EditDevice from "./EditDevice";

const formatRegDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

const translateStatus = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "대여 가능";
    case "RENTED":
      return "대여 중";
    case "INACTIVE":
      return "대여 불가";
    default:
      return "알 수 없음";
  }
};

const Device = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deviceData, setDeviceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    filterDevices();
  }, [searchTerm, deviceData]);

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://15.165.16.79:8080/device/list");
      if (!response.ok) throw new Error("Failed to fetch devices");

      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setDeviceData(data.data);
        setFilteredData(data.data);
      } else {
        console.error("Fetched data is not valid:", data);
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const filterDevices = () => {
    let filtered = deviceData;
    if (searchTerm) {
      filtered = filtered.filter(
        (device) =>
          device.deviceName.includes(searchTerm) ||
          device.regDate.includes(searchTerm) ||
          device.status.includes(searchTerm)
      );
    }

    if (sortOption === "name") {
      filtered.sort((a, b) => a.deviceName.localeCompare(b.deviceName));
    } else if (sortOption === "date") {
      filtered.sort((a, b) => new Date(a.regDate) - new Date(b.regDate));
    }

    setFilteredData(filtered);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    filterDevices();
  };

  const handleViewDevice = (device) => {
    setSelectedDevice(device);
    setShowModal(true);
  };

  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDevice(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedDevice(null); 
    fetchDevices(); 
  };

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
    fetchDevices();
  };

  return (
    <div className="Device">
      <MainNavbar />
      <img src={logo} alt="logo" className="Devicelogo" />
      <div className="Deviceeep" onClick={() => navigate("/")}>
        EEP
      </div>
      <div className="Devicetitle"> 기기 관리하기 </div>
      <div className="DeviceMent">기기 관리를 더욱 쉽게 도와줍니다.</div>
      <img src={buttonBack} alt="buttonBack" className="DevicebuttonBack" />
      <img src={bar} alt="bar" className="Devicebar" />
      <img src={question} alt="questionimage" className="questionimage" />
      <div className="DevicespanTag">
        <span className="DevicehomeSpan" onClick={() => navigate("/")}>
          홈
        </span>
        <span
          className="DevicebookOfficerSpan"
          onClick={() => navigate("/bookOfficer")}
        >
          도서 관리
        </span>
        <span className="DeviceSpan" onClick={() => navigate("/device")}>
          기기 관리
        </span>
        <span
          className="DevicestudentInfoSpan"
          onClick={() => navigate("/studentInfo")}
        >
          학생 정보 입력
        </span>
        <span
          className="DevicecontectSpan"
          onClick={() => navigate("/Emergency")}
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
      <button onClick={openRegistrationModal} className="RegisterButton">
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

      {/* 기기 상세 보기 모달 */}
      {selectedDevice && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <ViewDevice
            device={selectedDevice}
            isOpen={showModal}
            onClose={closeModal}
            setShowEditModal={setShowEditModal} 
          />
        </Modal>
      )}

      {/* 기기 수정 모달 */}
      {showEditModal && selectedDevice && (
        <Modal isOpen={showEditModal} onClose={closeEditModal}>
          <EditDevice device={selectedDevice} onClose={closeEditModal} />
        </Modal>
      )}

      {/* 기기 등록 모달 */}
      {isRegistrationModalOpen && (
        <Modal
          isOpen={isRegistrationModalOpen}
          onClose={closeRegistrationModal}
        >
          <Registration onClose={closeRegistrationModal} />
        </Modal>
      )}
    </div>
  );
};

export default Device;
