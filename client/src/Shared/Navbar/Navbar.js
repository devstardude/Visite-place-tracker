import React, { useContext, useState, useEffect, useRef } from "react";
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
import Avatar from "@material-ui/core/Avatar";
import { AuthContext } from "../Context/auth-context";
import TooltipInfo from "../TooltipInfo/TooltipInfo";

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
    transition: "3s",
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

const notLoggedInButtons = [
  {
    link: "/",
    text: "Home",
  },
  {
    link: "/login",
    text: "Login",
  },
  {
    link: "/register",
    text: "Register",
  },
  {
    link: "/about",
    text: "About",
  },
];

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const loggedIn = auth.isLoggedIn;
  const [navBackground, setNavBackground] = useState("appBarTransparent");
  const navRef = useRef();
  navRef.current = navBackground;
  const loggedInButtons = [
    {
      link: "/",
      text: "Home",
    },
    {
      link: "/global/users",
      text: "Users",
    },
    {
      link: `/user/${auth.userId}`,
      text: "Profile",
    },
    {
      link: "/add",
      text: "Add Data",
    },
    {
      link: "/globalzone",
      text: "Global Zone",
    },
    {
      link: "/about",
      text: "About",
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 200;
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
              {!loggedIn ? (
                <div className="mr-0 d-none d-md-block">
                  {notLoggedInButtons.map((button) => (
                    <Link key={button.text} className="Link" to={button.link}>
                      <Button
                        style={{ color: "white", fontFamily: "Montserrat" }}
                      >
                        {button.text}
                      </Button>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mr-0 d-none d-md-flex align-content-middle">
                  {loggedInButtons.map((button) => (
                    <Link key={button.text} className="Link" to={button.link}>
                      <Button
                        style={{ color: "white", fontFamily: "Montserrat" }}
                      >
                        {button.text}
                      </Button>
                    </Link>
                  ))}

                  <Button
                    onClick={auth.logout}
                    style={{ color: "white", fontFamily: "Montserrat" }}
                  >
                    Logout
                  </Button>
                  <Link to={`/user/${auth.userId}`} className="Link">
                    <TooltipInfo info={auth.username}>
                      <div className="mx-2">
                        <Avatar
                          src={auth.dp}
                          style={{ height: "30px", width: "30px" }}
                          alt="dp"
                        />
                      </div>
                    </TooltipInfo>
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
