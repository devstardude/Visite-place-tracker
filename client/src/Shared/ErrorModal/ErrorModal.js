import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div onClick={props.clicked}>
      <Modal
        className="d-flex align-content-center ErrorBoxModel"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className="container align-self-center ErrorBoxContainer p-0">
            <h2 className="pt-3 px-3 pb-2">{props.errorText}</h2>
            <div className="p-3 Center">
              <button
                onClick={handleClose}
                type="button"
                className="btn btn-outline-secondary mx-auto"
              >
                Close
              </button>
            </div>
          </div>
        </Zoom>
      </Modal>
    </div>
  );
};

export default ErrorModal;
