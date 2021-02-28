import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={handleOpen}
      >
        Delete
      </button>
      <Modal
        className="d-flex align-content-center DeleteBoxModel"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className="container align-self-center DeleteBoxContainer p-0">
            <h2 className="pt-3 px-3 pb-2">
              {props.deleteWarning}
              
            </h2>
            <div className="p-3 Center">
              <button
                onClick={handleClose}
                type="button"
                className="btn btn-outline-secondary "
              >
                Close
              </button>
              <div className="mx-2 d-inline" onClick={handleClose}>
                <button
                  onClick={props.deleteHandler}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Zoom>
      </Modal>
    </div>
  );
};

export default DeleteConfirmationModal;
