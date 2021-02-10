import React from "react";
import AppInfo from "../Components/AppInfo/AppInfo";
import Header from "../Components/Header/Header";
import Navbar from "../../../Shared/Navbar/Navbar";
//import'./Landing.css';

const Landing = (props) => {
  return (
    <div>
      <Navbar className="LandingNavbar" />
      <Header />
      <AppInfo />
    </div>
  );
};

export default Landing;
