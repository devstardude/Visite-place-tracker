import React from 'react';
import Navbar from '../../../Shared/Navbar/Navbar';
import GlobalUsersDiv from "../Components/GlobalUsersDiv/GlobalUsersDiv";

//import'./GlobalUser.css';

const GlobalUser = (props)=>{
    return(
    <div>
        <Navbar/>
        <GlobalUsersDiv/>
    </div>
);
};

export default GlobalUser ;