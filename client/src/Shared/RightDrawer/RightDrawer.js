import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
const RightDrawer = () => {
const loggedIn = false
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{ width: 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!loggedIn ? (
        <React.Fragment>
          <div className="container Center mt-5">
            <div className="mb-3">
              <Link className="Link" to="/login">
                <Button style={{ minWidth: "6rem" }} variant="outlined">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="container Center mt-5">
            <div className="mb-3">
              <Link className="Link" to="/">
                <Button style={{ minWidth: "6rem" }} variant="outlined">
                  Home
                </Button>
              </Link>
            </div>
            <div className="mb-3">
              <Link className="Link" to="/global/users">
                <Button style={{ minWidth: "6rem" }} variant="outlined">
                  Users
                </Button>
              </Link>
            </div>
            <div className="mb-3">
              <Link className="Link" to="/user/abc">
                <Button style={{ minWidth: "6rem" }} variant="outlined">
                  Profile
                </Button>
              </Link>
            </div>
            <div className="mb-3">
              <Link className="Link" to="/login/adduser">
                <Button style={{ minWidth: "6rem" }} variant="outlined">
                  Add User
                </Button>
              </Link>
            </div>
            <div className="mb-3">
              <Link className="Link" to="/add">
                <Button style={{ minWidth: "6rem" }} variant="outlined">
                  Add Data
                </Button>
              </Link>
            </div>
            <div className="mb-3">
              <Link className="Link">
                <Button
                  style={{ minWidth: "6rem" }}
                  variant="outlined"
                >
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer("right", true)}>
        <MenuIcon className="" style={{ color: "whitesmoke" }} />
      </Button>
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
};

export default RightDrawer;
