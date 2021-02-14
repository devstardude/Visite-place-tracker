import React from "react";
import ProfileCount from "../Components/ProfileCount/ProfileCount";
import UserHeader from "../Components/UserHeader/UserHeader";
import UserTabs from "../Components/UserTabs/UserTabs";
import'./SingleUser.css';

const SingleUser = (props) => {
  return (
    <div className="SingleUserPage" >
      <UserHeader />
      <ProfileCount/>
        <UserTabs />
    </div>
  );
};

export default SingleUser;
