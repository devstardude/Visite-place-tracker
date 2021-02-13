import React from 'react';
import Tooltip  from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

//import'./TooltipInfo.css';

const TooltipInfo = (props)=>{
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
    return (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          style={{ fontFamily: "Montserrat" }}
          arrow
          TransitionComponent={Zoom}
          title={props.info}
          onClick={handleTooltipOpen}
          onMouseEnter={handleTooltipOpen}
        >
          {props.children}
        </Tooltip>
      </ClickAwayListener>
    );
};

export default TooltipInfo ;