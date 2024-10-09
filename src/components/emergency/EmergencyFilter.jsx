import React from "react";
import "../../styles/Emergency.css";

const EmergencyFilter = ({
  selectedGrade,
  setSelectedGrade,
  selectedClass,
  setSelectedClass,
  selectedNumber,
  setSelectedNumber,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <div className="EmergencyFilter">
      <div className="EmergencyFilterTop">
        <p className="EmergencyFilterTitle">필터</p>
        <button
          className="EmergencyFilterReset"
          onClick={() => {
            setSelectedGrade(1);
            setSelectedClass(1);
            setSelectedNumber(1);
            setSearchQuery("");
          }}
        >
          초기화
        </button>
      </div>
      <input
        className="EmergencyFilterSearch"
        placeholder="이름을 입력해주세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="EmergencyFilterSection">
        <p className="EmergencyFilterSectionTitle">학년</p>
        <div className="EmergencyFilterSectionButtonWrapper">
          {[1, 2, 3].map((el) => (
            <button
              className={`EmergencyFilterSectionButton${
                el === selectedGrade ? "Active" : ""
              }`}
              key={el}
              onClick={() => setSelectedGrade(el)}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
      <div className="EmergencyFilterSection">
        <p className="EmergencyFilterSectionTitle">반</p>
        <div className="EmergencyFilterSectionButtonWrapper">
          {[1, 2, 3, 4].map((el) => (
            <button
              className={`EmergencyFilterSectionButton${
                el === selectedClass ? "Active" : ""
              }`}
              key={el}
              onClick={() => setSelectedClass(el)}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
      <div className="EmergencyFilterSection">
        <p className="EmergencyFilterSectionTitle">번호</p>
        <select
          className="EmergencyFilterSectionSelect"
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <button className="EmergencyFilterButton" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default EmergencyFilter;
