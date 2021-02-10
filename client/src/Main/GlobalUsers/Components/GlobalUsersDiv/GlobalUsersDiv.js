import React from "react";
import GlobalUserCard from "../GlobalUserCard/GlobalUserCard";
import SearchBar from "../SearchBar/SearchBar";

import "./GlobalUsersDiv.css";

const users = [
  {
    name: "Dude",
    Desc: "Just a Guy who's a developer for fun",
  },
  {
    name: "Dude",
    Desc: "Just a Guy who's a developer for fun",
  },
  {
    name: "Dude",
    Desc: "Just a Guy who's a developer for fun",
  },
  {
    name: "Dude",
    Desc: "Just a Guy who's a developer for fun",
  },
  {
    name: "Dude",
    Desc: "Just a Guy who's a developer for fun",
  },
  {
    name: "Dude",
    Desc: "Just a Guy who's a developer for fun",
  },
  {
    name: "Dude",
    Desc: "Just a Guy who's a developer for fun",
  },
  {
    name: "Dude",
    Desc: "Just a Guy who's a developer for fun",
  },
];

const GlobalUsersDiv = (props) => {
  return (
    <div>
      <div className="GlobalUsersDiv"></div>
      <div className="GlobalUsersContent  ">
        <div className="GlobalSearchBar">
          <SearchBar />
        </div>
        <div className="container UsersScrollableDiv my-5 ">
          <div className="row mx-0 mx-md-5 ">
            {users.map((user) => (
              <div className="col-12 col-lg-6">
                <GlobalUserCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalUsersDiv;
