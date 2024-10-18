import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import config from "../config/config.json";
import "../styles/ViewDamage.css";

const issueTypeMapping = {
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
      setIssueType(issueTypeMapping[damage.issueType] || damage.issueType); // Mapping issue type
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
        <div>
          <input
            type="text"
            className="ViewDamageMent"
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
          <textarea
            className="DamageDescriptionInput"
            value={description}
            readOnly
          />
        </div>

        <div className="button-group">
          <button onClick={handleDeleteDamage} className="deleteButton">
            삭제
          </button>
          <button onClick={onClose} className="selectButton">
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewDamage;
