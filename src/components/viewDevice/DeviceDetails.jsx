import React from "react";
import Uproad from "../../assets/img/Upload.svg";

const DeviceDetails = ({
  deviceName,
  registrationDate,
  deviceImage,
  handleEditDevice,
  onClose,
}) => {
  return (
    <div className="ViewForm">
      <div className="ViewMent">기기 정보</div>
      <div className="ViewDetailItem">
        <label className="ViewDeviceName">기기명</label>
        <input
          type="text"
          value={deviceName}
          className="ViewDeviceInput"
          readOnly
        />
      </div>
      <div className="ViewDetailItem">
        <label className="ViewRegistrationDate">등록일</label>
        <input
          type="text"
          value={registrationDate}
          className="DeviceViewDateInput"
          readOnly
        />
      </div>
      <label className="Viewreturner">마지막 반납자 :</label>
      <input
        type="text"
        value="정보 없음"
        className="ViewReturnerInput"
        readOnly
      />
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
  );
};

export default DeviceDetails;
