import React, { useState, useEffect, useCallback } from "react";
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
import "../components/Header";
import SearchBar from "../components/SearchBar";
import config from "../config/config.json";
import Header from "../components/Header";

// 날짜 형식 변환 함수
const formatRegDate = (dateString) =>
  !dateString ? "" : new Date(dateString).toLocaleDateString();

// 기기 상태 번역 함수
const translateStatus = (status) => {
  const statusMap = {
    AVAILABLE: "대여 가능",
    RENTED: "대여 중",
    INACTIVE: "대여 불가",
  };
  return statusMap[status] || "알 수 없음";
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

  const fetchDevices = useCallback(async () => {
    try {
      const response = await fetch(`${config.serverurl}/device/list`);
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
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  useEffect(() => {
    filterDevices();
  }, [searchTerm, sortOption, deviceData]);

  // 기기 목록 필터링 및 정렬
  const filterDevices = useCallback(() => {
    let filtered = deviceData;

    if (searchTerm) {
      filtered = filtered.filter(
        (device) =>
          device.deviceName.includes(searchTerm) ||
          device.regDate.includes(searchTerm) ||
          device.status.includes(searchTerm)
      );
    }

    if (sortOption) {
      const sortFuncs = {
        name: (a, b) => a.deviceName.localeCompare(b.deviceName),
        date: (a, b) => new Date(a.regDate) - new Date(b.regDate),
      };
      filtered.sort(sortFuncs[sortOption]);
    }

    setFilteredData(filtered);
  }, [deviceData, searchTerm, sortOption]);

  // 검색 입력 처리
  const handleSearch = (event) => setSearchTerm(event.target.value);

  // 정렬 옵션 변경 처리
  const handleSortChange = (event) => setSortOption(event.target.value);

  // 기기 상세 보기 모달 열기
  const handleViewDevice = (device) => {
    setSelectedDevice(device);
    setShowModal(true);
  };

  // 기기 등록 모달 열기
  const openRegistrationModal = () => setIsRegistrationModalOpen(true);

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setSelectedDevice(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedDevice(null);
    fetchDevices(); // 기기 수정 후 목록 다시 불러오기
  };

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
    fetchDevices(); // 기기 등록 후 목록 다시 불러오기
  };

  return (
    <div className="Device">
      <MainNavbar />
      <div className="Devicetitle"> 기기 관리하기 </div>
      <div className="DeviceMent">기기 관리를 더욱 쉽게 도와줍니다.</div>
      <img src={question} alt="questionimage" className="questionimage" />
      <Header
        logo={logo}
        bar={bar}
        buttonBack={buttonBack}
        styles={{
          headerContainer: "DeviceHeaderContainer",
          buttonBack: "DevicebuttonBack",
          homeSpan: "DevicehomeSpan",
          bookOfficerSpan: "DevicebookOfficerSpan",
          deviceSpan: "DeviceSpan",
          studentInfoSpan: "DevicestudentInfoSpan",
          emergencySpan: "DevicecontectSpan",
        }}
      />
      <div className="DeviceSearchWrapper">
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={(e) => handleSearch(e)}
          sortOption={sortOption}
          handleSortChange={(e) => handleSortChange(e)}
          placeholder="기기 이름을 검색해주세요."
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
