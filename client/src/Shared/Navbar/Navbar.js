import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import RightDrawer from "../RightDrawer/RightDrawer";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import * as db from "../../firebase/firebase";
import Avatar from "@material-ui/core/Avatar";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingLeft: "18px",
    flexGrow: 1,
  },
  appBarTransparent: {
    backgroundColor: "#00000000",
  },
  appBarSolid: {
    backgroundColor: "#0000009a",
  },
}));

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Navbar = (props) => {
  const [user] = useAuthState(firebase.auth());
  const classes = useStyles();

  const [navBackground, setNavBackground] = useState("appBarTransparent");
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 300;
      if (show) {
        setNavBackground("appBarSolid");
      } else {
        setNavBackground("appBarTransparent");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className="position-absolute">
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar elevation={0} className={classes[navRef.current]}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" className="Link">
                  Visité
                </Link>
              </Typography>
              {!user ? (
                <div className="mr-0 d-none d-md-block">
                  <Link className="Link" to="/login">
                    <Button
                      style={{ color: "white", fontFamily: "Montserrat" }}
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login/adduser" className="Link">
                    <Button
                      style={{ color: "white", fontFamily: "Montserrat" }}
                    >
                      Add User
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mr-0 d-none d-md-flex align-content-middle">
                  <Link className="Link" to="/">
                    <Button
                      style={{ color: "white", fontFamily: "Montserrat" }}
                    >
                      Home
                    </Button>
                  </Link>
                  <Link to="/global/users" className="Link">
                    <Button
                      style={{ color: "white", fontFamily: "Montserrat" }}
                    >
                      Users
                    </Button>
                  </Link>
                  <Link to="/global/users/abc" className="Link">
                    <Button
                      style={{ color: "white", fontFamily: "Montserrat" }}
                    >
                      Profile
                    </Button>
                  </Link>
                  <Link to="/login/adduser" className="Link">
                    <Button
                      style={{ color: "white", fontFamily: "Montserrat" }}
                    >
                      Add User
                    </Button>
                  </Link>
                  <Link to="/add" className="Link">
                    <Button
                      style={{ color: "white", fontFamily: "Montserrat" }}
                    >
                      Add Data
                    </Button>
                  </Link>
                  <Link to="/" className="Link" onClick={db.logOut}>
                    <Button
                      style={{ color: "white", fontFamily: "Montserrat" }}
                    >
                      Logout
                    </Button>
                  </Link>
                  <Link to="/" className="Link">
                    <div className="mx-2">
                      <Avatar
                        style={{ height: "30px", width: "30px" }}
                        alt="dp"
                        src={user.photoURL}
                      />
                    </div>
                  </Link>
                </div>
              )}

              <div className="d-block d-md-none m-0 p-0">
                <RightDrawer />
              </div>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
        <Container className="m-0 p-0"></Container>
      </div>
    </div>
  );
};
export default Navbar;
