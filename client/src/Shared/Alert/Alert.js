import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//import'./Alert.css';

const Alert = (props) => {
  const [open, setOpen] = useState(true);
  const openAlert = () => {
    setOpen(true);
  };

 
  return (
    <Snackbar
      open={props.openAlert}
      autoHideDuration={4000}
      onClose={props.handleClose}
    >
      <AlertBar onClose={props.handleClose} severity={props.variant}>
        {props.alertMessage}
      </AlertBar>
    </Snackbar>
  );
};
const AlertBar = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
