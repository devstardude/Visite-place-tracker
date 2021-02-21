import React from "react";
import SearchBox from "tomtom-react-searchbox";
import "./PlaceSearchBox.css";

const PlaceSearchBox=(props)=> {
  return (
    <div className="search-bar">
      <SearchBox
        wrapperClassName="search-box shadow bg-white rounded"
        onResultChoose={(result) => props.searchResult(result)}
        autofocus={false}
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
