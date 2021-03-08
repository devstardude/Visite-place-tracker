import React, { useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthContext } from "../Context/auth-context";
import { DrawerLinkButton } from "../CustomButton/CustomButton";
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


const RightDrawer = () => {
  const auth = useContext(AuthContext);
  const loggedIn = auth.isLoggedIn;
  const [state, setState] = React.useState({
    right: false,
  });
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

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className="WaveBackground h-100"
      style={{ width: 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {!loggedIn ? (
        <React.Fragment>
          <div className="container Center mt-5">
            {notLoggedInButtons.map((button) => (
              <DrawerLinkButton link={button.link} text={button.text} />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="container Center mt-5">
            {loggedInButtons.map((button) => (
              <DrawerLinkButton link={button.link} text={button.text} />
            ))}
            <div className="mb-3">
              <Button
                onClick={auth.logout}
                style={{
                  minWidth: "9rem",
                  border: "1px solid #2184ac",
                }}
                variant="outlined"
              >
                Logout
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );

  return (
    <React.Fragment >
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
