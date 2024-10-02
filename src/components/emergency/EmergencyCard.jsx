import React from "react";

const EmergencyCard = ({ studentName, studentId, imgUrl, openModal }) => {
  return (
    <div className="EmergencyCard" onClick={openModal}>
      <div className="EmergencyCardCircle" />
      {imgUrl ? (
        <img src={imgUrl} alt="Student" className="EmergencyCardImage" />
      ) : (
        <div className="EmergencyCardImage" />
      )}
      <div className="EmergencyCardName">{studentName}</div>
      <div className="EmergencyCardNumber">{studentId}</div>
    </div>
  );
};

export default EmergencyCard;
