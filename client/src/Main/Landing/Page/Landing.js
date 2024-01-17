import React from "react";
import AppInfo from "../Components/AppInfo/AppInfo";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
//import'./Landing.css';

const Landing = (props) => {
    React.useEffect(() => {
      return window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <Header />
      <AppInfo />
      <Footer/>
    </div>
  );
};

export default Landing;
