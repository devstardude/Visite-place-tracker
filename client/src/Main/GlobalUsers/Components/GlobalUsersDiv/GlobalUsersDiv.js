import React, { useState } from "react";
import GlobalUserCard from "../GlobalUserCard/GlobalUserCard";
import SearchBar from "../SearchBar/SearchBar";
import "./GlobalUsersDiv.css";

const users = [
  {
    id: "abcdefgh",
    name: "Arun Shekhar",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [12, 10, 18, 15],
    likes: "13",
    posts: "5",
  },
  {
    id: "abcdefgh",
    name: "Max Sweish",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [0, 0, 0, 0],
    likes: "3",
    posts: "5",
  },
  {
    id: "abcdefgh",
    name: "Yapa Nove",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [12, 6, 8, 5],
    likes: "3",
    posts: "5",
  },
  {
    id: "abcdefgh",
    name: "Minka Tenko",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [12, 6, 8, 5],
    likes: "3",
    posts: "5",
  },
  {
    id: "abcdefgh",
    name: "Dodo dodora",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [12, 6, 8, 5],
    likes: "3",
    posts: "5",
  },
  {
    id: "abcdefgh",
    name: "Panko Tomo",
    desc:
      "Just a guy who's a hero for fun ! I Never lose ! and surface world is guarded by me",
    placesCount: [12, 6, 8, 5],
    likes: "3",
    posts: "5",
  },
];

const GlobalUsersDiv = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [exam, setExam] = useState();

  const checkArray = (users) => {
    const newArray = users.filter((user) => {
      if (searchQuery === "") {
        return user;
      } else if (user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return user;
      }
    });
    return newArray;
  };
  return (
    <div>
      <div className="GlobalUsersDiv"></div>
      <div className="GlobalUsersContent  ">
        <div className="GlobalSearchBar">
          <SearchBar
            TextValue={searchQuery}
            change={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div className="px-2 mx-0 mx-lg-5">
          <div className="container UsersScrollableDiv px-0 my-4">
            <div className="row px-0 px-lg-5">
              {checkArray(users).map((user) => (
                <div
                  key={user.name}
                  className="GlobalCardScaled col-12 col-lg-6 py-0 py-lg-1"
                >
                  {users && <GlobalUserCard users={user} />}
                </div>
              ))}
            </div>
            {checkArray(users).length === 0 && <NoUsers />}
          </div>
        </div>
      </div>
    </div>
  );
};

const NoUsers = () => {
  return (
    <div className="mx-5 Center">
      <h5 className="mx-auto mt-2 mt-md-4 p-2 p-md-3 NoUsersDiv">
        User Not Found
      </h5>
    </div>
  );
};

export default GlobalUsersDiv;
