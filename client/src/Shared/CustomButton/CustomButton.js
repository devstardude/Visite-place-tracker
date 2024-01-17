import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import classes from "./CustomButton.module.css";

export const CustomSubmitButton = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Button
        disabled={props.isDisabled}
        variant="contained"
        disableElevation
        className={classes.CustomSubmitButton}
        endIcon={
          props.isLoading && (
            <CircularProgress style={{ color: "black", right: 0 }} size={25} />
          )
        }
        {...props}
      >
        {props.text}
      </Button>
    </div>
  );
};

export const DrawerLinkButton = (props) => {
  return (
    <div className="mb-3">
      <Link className="Link" to={props.link}>
        <Button className={classes.DrawerLinkButton} style={{ minWidth: "9rem" }} variant="outlined" {...props}>
          {props.text}
        </Button>
      </Link>
    </div>
  );
};