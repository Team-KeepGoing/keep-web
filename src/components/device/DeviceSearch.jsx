import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";

const DeviceSearch = ({
  devices = [],
  searchTerm,
  handleSearch,
  sortOption,
  handleSortChange,
}) => {
  const [filteredDevices, setFilteredDevices] = useState(devices);

  useEffect(() => {
    // devices가 유효하지 않으면 아무 것도 하지 않음
    if (!devices) return;

    // 검색 필터링
    const filtered = devices.filter((device) =>
      device.deviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 정렬
    const sorted = filtered.sort((a, b) => {
      if (sortOption === "name") {
        return a.deviceName.localeCompare(b.deviceName);
      } else if (sortOption === "date") {
        return new Date(a.regDate) - new Date(b.regDate); // 등록일 순으로 정렬
      }
      return 0; // 기본값: 변동 없음
    });

    setFilteredDevices(sorted);
  }, [searchTerm, sortOption, devices]);

  return (
    <div className="DeviceSearchWrapper">
      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        placeholder="기기 이름을 검색해주세요."
      />
      <div className="SortDropdownWrapper">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="SortDropdown"
        >
          <option value="">정렬</option>
          <option value="date">이름 순</option>
          <option value="name">등록일 순</option>
        </select>
      </div>
      <div className="DeviceList">
        {filteredDevices.map((device) => (
          <div key={device.id} className="DeviceItem">
            {device.deviceName} - {device.regDate}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceSearch;
