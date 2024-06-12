import React, { useState, useEffect } from "react";

export default function SearchBar({ searchHandler }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    searchHandler(searchText);
  }, [searchText]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск резюме"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}
