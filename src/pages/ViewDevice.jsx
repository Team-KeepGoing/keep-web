import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "../styles/ViewDevice.css";
import Uproad from "../assets/img/Upload.svg";

const ViewDevice = ({ isOpen, onClose, device, setShowEditModal }) => {
  const [deviceName, setDeviceName] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [deviceImage, setDeviceImage] = useState("");

  useEffect(() => {
    if (device) {
      setDeviceName(device.deviceName);
      setRegistrationDate(formatRegistrationDate(device.regDate));
      setDeviceImage(device.imgUrl);
    }
  }, [device]);

  // 정보 보내는게 업서용
  const handleEditDevice = () => {
    setShowEditModal(true); // EditDevice 모달을 먼저 열기
    setTimeout(() => {
      onClose(); // ViewDevice 모달을 살짝 지연 후 닫기
    }, 0); // 0ms 지연을 사용해도 충분히 모달이 먼저 열리게 됩니다.
  };

  const handleSendInfo = async () => {};

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="ViewDevice">
        <div className="ViewForm">
          <div className="ViewMent">기기 정보</div>
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
                onError={(e) => {
                  e.target.src = Uproad;
                  console.error("Image failed to load:", deviceImage);
                }}
              />
            )}
          </div>
          <button onClick={handleEditDevice} className="SaveButton">
            수정
          </button>
          <button onClick={onClose} className="CancelButton">
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewDevice;
