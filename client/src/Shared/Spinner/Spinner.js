import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
//import'./Spinner.css';

const Spinner = (props)=>{
    return (
      <div className="container Center py-2">
        <CircularProgress
          color="inherit"
          size={`3.5rem`}
          style={{ display: "inline-block", color: "white" }}
        />
      </div>
    );
};

export default Spinner ;