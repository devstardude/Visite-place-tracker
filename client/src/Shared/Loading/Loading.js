import React from 'react';
import ExploreIcon from "@material-ui/icons/Explore";

import Backdrop from "@material-ui/core/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./Loading.module.css"
export default function SimpleBackdrop() {
  

  return (
    <div>
      <Backdrop style={{ backgroundColor: "#242424" }} open={true}>
        {/* <CircularProgress color="inherit" /> */}
        <div className="LoadingIcon">
          <ExploreIcon className={styles.LoadingIcon} />
        </div>
      </Backdrop>
    </div>
  );
}