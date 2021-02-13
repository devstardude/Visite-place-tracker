// import React from 'react';

// import'./SearchBar.css';

// const SearchBar = (props)=>{
//   return (
//     <div className="container Center ">
//         <input className="SearchBar rounded-pill "></input>
//     </div>
//   );
// };

// export default SearchBar ;


import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
//import'./SearchBar.css';

const SearchBar = (props) => {
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  return (
    <div>
      <header>
        <div className="mx-auto" style={{ width: 400, zIndex: 2 }}>
          <ReactSearchAutocomplete
            style={{ zIndex: 2 }}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
          />
        </div>
      </header>
    </div>
  );
};

export default SearchBar;
