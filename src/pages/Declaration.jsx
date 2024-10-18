import React, { useState, useEffect, useCallback } from "react";
import logo from "../assets/img/Guideslogo.svg";
import bar from "../assets/img/bar.svg";
import buttonBack from "../assets/img/buttonBackground.svg";
import "../styles/Declaration.css";
import MainNavbar from "./MainNavbar";
import Modal from "./Modal";
import ViewDamage from "./ViewDamage";
import Header from "../components/Header";
import config from "../config/config.json";

const formatRegDate = (dateString) =>
  !dateString ? "" : new Date(dateString).toISOString().substring(0, 10);

const issueTypeMap = {
  COVER_DAMAGE: "표지 손상",
  PAGE_ISSUE: "페이지 관련 문제",
  BOOK_BODY_DAMAGE: "책 본체 손상",
  TEXT_PRINT_ISSUE: "텍스트 및 인쇄 문제",
  ENVIRONMENTAL_DAMAGE: "환경적 손상",
  SCREEN_ISSUE: "화면 관련 문제",
  CONNECTIVITY_ISSUE: "연결성 문제",
  BATTERY_POWER_ISSUE: "배터리 및 전원 문제",
  SOUND_ISSUE: "음향 문제",
  EXTERNAL_DAMAGE: "외부 파손",
  OTHER: "기타",
};

const Declaration = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchDamagedDevices = useCallback(async () => {
    try {
      const response = await fetch(`${config.serverurl}/damage/all`);
      if (!response.ok) throw new Error("Failed to fetch damaged devices");
      const data = await response.json();
      console.log("Fetched damaged devices:", data);
      if (data && Array.isArray(data.data)) {
        setDeviceData(data.data);
      } else {
        console.error("Fetched data is not valid:", data);
      }
    } catch (error) {
      console.error("Error fetching damaged devices:", error);
      alert("Failed to fetch damaged devices.");
    }
  }, []);

  useEffect(() => {
    fetchDamagedDevices();
  }, [fetchDamagedDevices]);

  const handleViewDevice = (device) => {
    setSelectedDevice({
      ...device,
      id: device.idx, 
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDevice(null);
  };

  const handleDeleteAndRefresh = async () => {
    await fetchDamagedDevices();
    closeModal();
  };

  return (
    <div className="Device">
      <MainNavbar />
      <div className="Devicetitle"> 신고 내역 확인 </div>
      <div className="DeviceMent">신고된 도서/기자재를 확인하세요.</div>
      <Header
        logo={logo}
        bar={bar}
        buttonBack={buttonBack}
        activePage="declaration"
        styles={{
          headerContainer: "DamageHeaderContainer",
          buttonBack: "DamagebuttonBack",
          homeSpan: "DevicehomeSpan",
          bookOfficerSpan: "DevicebookOfficerSpan",
          deviceSpan: "DamageDeviceSpan",
          studentInfoSpan: "DevicestudentInfoSpan",
          emergencySpan: "BookOfficerEmergencySpan",
          declarationSpan: "DamageSpan",
        }}
      />

      <div className="DamageTable">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>신고된 기기</th>
              <th>신고일</th>
              <th>문제 유형</th>
            </tr>
          </thead>
          <tbody>
            {deviceData.map((device, index) => (
              <tr key={index} onClick={() => handleViewDevice(device)}>
                <td>{index + 1}</td>
                <td>{device.code}</td>
                <td>{formatRegDate(device.reportDate)}</td>
                <td>{issueTypeMap[device.issueType] || device.issueType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedDevice && (
        <Modal onClose={closeModal} isOpen={showModal}>
          <ViewDamage
            isOpen={showModal}
            onClose={handleDeleteAndRefresh}
            damage={selectedDevice}
            description={selectedDevice.description}
          />
        </Modal>
      )}
    </div>
  );
};

export default Declaration;
