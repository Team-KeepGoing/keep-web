import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import config from "../config/config.json";
import "../styles/ViewDamage.css";

const ViewDamage = ({ isOpen, onClose, damage }) => {
  const [deviceName, setDeviceName] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (damage) {
      console.log("damage data:", damage);
      setDeviceName(damage.deviceName || damage.code); // deviceName이 없을 경우 code 사용
      setReportDate(formatReportDate(damage.reportDate));
      setIssueType(damage.issueType);
      setDescription(damage.description || "");
    }
  }, [damage]);

  const formatReportDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleDeleteDamage = async () => {
    if (damage && damage.id) {
      try {
        const response = await fetch(
          `${config.serverurl}/damage/${damage.id}`, // id 대신 idx 사용
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          alert("삭제되었습니다.");
          onClose();
        } else {
          alert("삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("삭제 요청 중 오류 발생:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="ViewDamageForm">
        <div className="ViewDamageMent">신고 내역</div>

        <div>
          <span className="ViewDamageName">기기명</span>
          <input
            type="text"
            className="ViewDamageNameInput"
            value={deviceName}
            readOnly
          />
        </div>

        <div>
          <span className="ViewReportDate">신고일 |</span>
          <input
            type="text"
            className="DamageViewDateInput"
            value={reportDate}
            readOnly
          />
        </div>

        <div>
          <span className="DamageItsue">문제 유형</span>
          <input
            type="text"
            className="DamageItsueInput"
            value={issueType}
            readOnly
          />
        </div>

        <div>
          <span className="DamageDescription">문제 상황</span>
          <input
            type="text"
            className="DamageDescriptionInput"
            value={description}
            readOnly
          />
        </div>

        <div className="button-group">
          <button onClick={handleDeleteDamage} className="deleteButton">삭제</button>
          <button onClick={onClose} className="selectButton">확인</button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewDamage;
