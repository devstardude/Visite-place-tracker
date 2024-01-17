import React from "react";
import Masthead from "../../../Shared/Masthead/Masthead";
import GlobalZoneTabs from "../Components/GlobalZoneTabs/GlobalZoneTabs";
//import'./GlobalZone.css';

const GlobalZone = (props) => {
  return (
    <div>
      <Masthead title="Global Zone" />
      <GlobalZoneTabs/>
    </div>
  );
};

export default GlobalZone;
