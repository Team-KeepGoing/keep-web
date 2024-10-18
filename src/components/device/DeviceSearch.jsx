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
    if (!devices) return;

    const filtered = devices.filter((device) =>
      device.deviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortOption === "name") {
        return a.deviceName.localeCompare(b.deviceName);
      } else if (sortOption === "date") {
        return new Date(a.regDate) - new Date(b.regDate);
      }
      return 0;
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
    </div>
  );
};

export default DeviceSearch;
