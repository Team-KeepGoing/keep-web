import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import DeviceDetails from "../components/viewDevice/DeviceDetails";
import "../styles/ViewDevice.css";

const ViewDevice = ({ isOpen, onClose, device, setShowEditModal }) => {
  const handleEditDevice = () => {
    setShowEditModal(true);
  };
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

  const formatRegistrationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="ViewDevice">
        <DeviceDetails
          deviceName={deviceName}
          registrationDate={registrationDate}
          deviceImage={deviceImage}
          handleEditDevice={handleEditDevice}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};

export default ViewDevice;
