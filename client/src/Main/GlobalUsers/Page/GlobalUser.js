import React from 'react';
import GlobalUsersDiv from "../Components/GlobalUsersDiv/GlobalUsersDiv";

const GlobalUser = (props)=>{
     React.useEffect(() => {
       return window.scrollTo(0, 0);
     }, []);
    return(
    <div>
        <GlobalUsersDiv/>
    </div>
);
};

export default GlobalUser ;