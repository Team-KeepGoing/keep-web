import React from "react";
import SearchBar from "../../components/SearchBar";

const DeviceSearch = ({
  searchTerm,
  handleSearch,
  sortOption,
  handleSortChange,
}) => {
  return (
    <div className="DeviceSearchWrapper">
      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortOption={sortOption}
        handleSortChange={handleSortChange}
        placeholder="기기 이름을 검색해주세요."
      />
      <div className="SortDropdownWrapper">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="SortDropdown"
        >
          <option value="date">정렬</option>
          <option value="name">이름 순</option>
          <option value="">등록일 순</option>
        </select>
      </div>
    </div>
  );
};

export default DeviceSearch;
