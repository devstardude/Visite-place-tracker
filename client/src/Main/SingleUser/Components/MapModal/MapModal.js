import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import "./MapModal.css";

const ModalBox = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const position = [27.1751, 78.0421];

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={handleOpen}
      >
        Show Map
      </button>
      <Modal
        className="d-flex align-content-center MapBoxModel"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className="container align-self-center MapBoxContainer p-0">
            <h2 className="pt-3 px-3 pb-2">Yeah Baby!</h2>
            <div className="MapDiv">
              <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={position}
                zoom={17}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}></Marker>
              </MapContainer>
            </div>
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

export default ModalBox;
