import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import'./SearchBar.css';

const SearchBar = (props)=>{
  return (
    <div className="container SearchBar">
      <div className="d-flex rounded-pill bg-light p-2">
        <div className="my-auto px-2">
          <SearchIcon className="SearchIcon" />
        </div>
        <div className="w-100 px-2">
          <input
            type="text"
            spellCheck="false"
            className="SearchBarInput w-100"
            value={props.TextValue}
            onChange={props.change}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar ;