import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import question from "../assets/img/question.svg";
import "styles/Device.css";
import MainNavbar from "./MainNavbar";

const Device = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deviceData, setDeviceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    filterDevices();
  }, [searchTerm, deviceData]);

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://3.34.2.12:8080/device/list");
      if (!response.ok) {
        throw new Error("Failed to fetch devices");
      }
      const result = await response.json();
      console.log("Fetched Devices:", result);

      if (result.data && Array.isArray(result.data)) {
        setDeviceData(result.data);
        setFilteredData(result.data);
      } else {
        console.error("Fetched data is not an array:", result);
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
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

  const handleViewDevice = (index) => {
    const selectedDevice = filteredData[index];
    navigate("/viewDevice", { state: { device: selectedDevice } });
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

  return (
    <div className="Device">
      <MainNavbar />
      <img src={logo} alt="logoimage" className="Devicelogo" />
      <div className="Deviceeep">EEP</div>
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
              <tr key={index} onClick={() => handleViewDevice(index)}>
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
    </div>
  );
};

export default Device;
