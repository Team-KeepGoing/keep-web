import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ViewDevice.css";
import MainNavbar from "./MainNavbar";
import Device from "./Device";

const ViewDevice = () => {
  const [deviceName, setDeviceName] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [deviceImage, setDeviceImage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.device) {
      const { device } = location.state;
      setDeviceName(device.deviceName);
      setRegistrationDate(formatRegistrationDate(device.regDate));
      setDeviceImage(device.imageUrl);
    }
  }, [location.state]);

  const handleCancel = () => {
    navigate("/device");
  };

  const handleEditDevice = () => {
    if (location.state && location.state.device) {
      navigate("/editDevice", { state: { device: location.state.device } });
    }
  };

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="ViewDevice">
      <MainNavbar />
      <Device />
      <div className="ViewDeviceForm">
        <div className="ViewDviceMent">기기 정보</div>
        <div className="ViewDetailItem">
          <label className="ViewDeviceName">기기명</label>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="ViewDeviceInput"
            readOnly
          />
        </div>
        <div className="ViewDetailItem">
          <label className="ViewRegistrationDate">등록일</label>
          <input
            type="text"
            value={registrationDate}
            onChange={(e) => setRegistrationDate(e.target.value)}
            className="DeviceViewDateInput"
            readOnly
          />
        </div>
        <div className="ViewDetailItem">
          {deviceImage && (
            <img
              src={deviceImage}
              alt="Device"
              className="DeviceImagePreview"
            />
          )}
        </div>
        <button onClick={handleEditDevice} className="SaveButton">
          수정
        </button>
        <button onClick={handleCancel} className="CancelButton">
          취소
        </button>
      </div>
    </div>
  );
};

export default ViewDevice;
