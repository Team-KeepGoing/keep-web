import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({
  searchTerm,
  handleSearch,
  sortOption,
  handleSortChange,
  placeholder,
}) => {
  return (
    <div className="SearchWrapper">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        className="SearchBar"
      />
      <div className="SortDropdownWrapper">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="SortDropdown"
        >
          <option value="">정렬</option>
          <option value="name">이름 순</option>
          <option value="date">등록일 순</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
