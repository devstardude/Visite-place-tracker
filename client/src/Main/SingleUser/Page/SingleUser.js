import React from "react";
import UserHeader from "../Components/UserHeader/UserHeader";
import UserTabs from "../Components/UserTabs/UserTabs";
//import'./SingleUser.css';

const SingleUser = (props) => {
  return (
    <div>
      <UserHeader />
      <div className="container mt-5">
        <UserTabs />
      </div>
    </div>
  );
};

export default SingleUser;
