import React, { useState, useEffect } from "react";
import GlobalUserCard from "../GlobalUserCard/GlobalUserCard";
import SearchBar from "../SearchBar/SearchBar";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import "./GlobalUsersDiv.css";
import ErrorModal from "../../../../Shared/ErrorModal/ErrorModal";
import Spinner from "../../../../Shared/Spinner/Spinner";

const GlobalUsersDiv = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  const checkArray = () => {
    const newArray = loadedUsers.filter((user) => {
      if (searchQuery === "") {
        return user;
      } else if (
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return user;
      }
    });
    return newArray;
  };
  return (
    <div>
      {error && <ErrorModal errorText={error} clicked={clearError} />}
      <div className="GlobalUsersDiv"></div>
      <div className="GlobalUsersContent  ">
        <div className="GlobalSearchBar">
          <SearchBar
            TextValue={searchQuery}
            change={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div className="px-3 px-md-5">
          <div className="container UsersScrollableDiv px-0 px-md-5 my-4 ">
            <div className="row px-0  ">
              {isLoading && <Spinner />}
              {!isLoading &&
                loadedUsers &&
                checkArray(loadedUsers).map((user) => (
                  <div
                    key={user.id}
                    className="GlobalCardScaled col-12 col-lg-6 py-2 py-md-3 py-lg-4"
                  >
                    {loadedUsers && <GlobalUserCard user={user} />}
                  </div>
                ))}
            </div>
            {!isLoading &&
              loadedUsers &&
              checkArray(loadedUsers).length === 0 && <NoUsers />}
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
