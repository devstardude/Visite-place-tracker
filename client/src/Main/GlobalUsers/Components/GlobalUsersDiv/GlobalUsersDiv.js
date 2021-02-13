import React from "react";
import GlobalUserCard from "../GlobalUserCard/GlobalUserCard";
import SearchBar from "../SearchBar/SearchBar";

import "./GlobalUsersDiv.css";

const users = [
  {
    id:"abcdefgh",
    name: "Arun Shekhar",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [12,10,18,15],
    likes:"13",
    posts:"5"
  },
  {
    id:"abcdefgh",
    name: "Arun Shekhar",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [0,0,0,0],
    likes:"3",
    posts:"5"
  },
  {
    id:"abcdefgh",
    name: "Arun Shekhar",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [12,6,8,5],
    likes:"3",
    posts:"5"
  },
  {
    id:"abcdefgh",
    name: "Arun Shekhar",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [12,6,8,5],
    likes:"3",
    posts:"5"
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
              <div key={user.name} className="col-12 col-lg-6">
                {users && <GlobalUserCard users={user} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalUsersDiv;
