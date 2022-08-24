import { useRef, useState } from "react";
import SearchBar from "material-ui-search-bar";

export default function Searchbar({ search, setsearch }) {
  let input = useRef(null);
  let timer = useRef(null);

  function handleClick(e) {
    setsearch(e);
    input.current.value = 0;
  }

  function handleChange(e) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setsearch(e), 300);
  }

  return (
    <div className="search">
      <SearchBar
        onChange={handleChange}
        onRequestSearch={handleClick}
      />
    </div>
  );
}
