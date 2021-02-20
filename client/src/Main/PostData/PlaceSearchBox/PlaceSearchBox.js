import React from "react";
import SearchBox,{ components } from "tomtom-react-searchbox";
import "./PlaceSearchBox.css";

const PlaceSearchBox=(props)=> {
    function CustomClear({ onClear }) {
      return <div onClick={onClear}>Clear</div>;
    }
  return (
    <div className="search-bar">
      <SearchBox
        wrapperClassName="search-box shadow bg-white rounded"
        onResultChoose={(result) => props.searchResult(result)}
        autofocus={true}
        placeholder="Search for an address"
        searchOptions={{
          key: process.env.REACT_APP_TOMTOM_API_KEY,
          language: "en-Gb",
          limit: 5,
          typeahead: true,
        }}
        components={{
          Clear: props.CustomClear,
        }}
      />
    </div>
  );
}

export default PlaceSearchBox;
