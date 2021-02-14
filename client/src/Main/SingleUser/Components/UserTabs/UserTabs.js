import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ExploreIcon from "@material-ui/icons/Explore";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import ChatIcon from "@material-ui/icons/Chat";
import { useWindowSize as useWindowSizeD } from "@react-hook/window-size/";
import PlaceCard from "../PlaceCard/PlaceCard";
import styles from "./UserTabs.module.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}


const UserTabs = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [widthD] = useWindowSizeD();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={styles.Root}>
      <AppBar className={styles.AppBar} position="static" color="#ffffff">
        <Tabs
          elivation={0}
          className={styles.Tabs}
          classes={{ indicator: styles.Indicator }}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          aria-label="tabs "
          centered
        >
          <Tab
            style={{ outline: "none" }}
            icon={<ExploreIcon />}
            label={widthD < 768 ? "" : "Visited"}
            aria-label="Visited"
            {...a11yProps(0)}
          />
          <Tab
            style={{ outline: "none" }}
            icon={<BookmarkIcon />}
            label={widthD < 768 ? "" : "Wishlist"}
            aria-label="Wishlist"
            {...a11yProps(1)}
          />
          <Tab
            style={{ outline: "none" }}
            icon={<FeaturedPlayListIcon />}
            label={widthD < 768 ? "" : "Posts"}
            aria-label="Posts"
            {...a11yProps(2)}
          />
          <Tab
            style={{ outline: "none" }}
            icon={<ChatIcon />}
            label={widthD < 768 ? "" : "Messages"}
            aria-label="Messages"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <PlaceCard />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Item Four
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default UserTabs;
