import React, { useState, useEffect } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import question from "../assets/img/question.svg";
import { useNavigate } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import "styles/Device.css";

const Device = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch("http://3.34.2.12:8080/device/list");
      if (!response.ok) {
        throw new Error("Failed to fetch devices");
      }
      const result = await response.json();
      console.log("Fetched Devices:", result); // 받아온 데이터를 콘솔에 출력

      if (result.data && Array.isArray(result.data)) {
        setFilteredData(result.data);
      } else {
        console.error("Fetched data is not an array:", result);
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = filteredData.filter(
        (device) =>
          device.deviceName.includes(term) ||
          (device.regDate && device.regDate.includes(term)) ||
          (device.status && device.status.includes(term))
      );
      setFilteredData(filtered);
    } else {
      fetchDevices();
    }
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

  const handleEditDevice = (index) => {
    const selectedDevice = filteredData[index];
    navigate("/editDevice", { state: { device: selectedDevice } });
  };

  const formatRegDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const translateStatus = (status) => {
    if (status === "AVAILABLE") return "대여 가능";
    return status; // Add other status translations as needed
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((device, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{device.deviceName}</td>
                <td>{formatRegDate(device.regDate)}</td>
                <td>
                  <span
                    style={{
                      color:
                        device.status === "AVAILABLE" ? "#3182F7" : "#32C000",
                    }}
                  >
                    {translateStatus(device.status)}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEditDevice(index)}
                    className="checkBox1"
                  ></button>
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
