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
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import CoverPic from "../../../assets/images/cover.jpg";
import Masthead from "../../../Shared/Masthead/Masthead";
import styles from "./PostDataTabs.module.css";
import { Paper } from "@material-ui/core";
import AddPlace from "../AddPlace/AddPlace";
import AddPost from "../AddPost/AddPost";

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

const PostDataTabs = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <div>
        <Masthead cover={CoverPic} title="Add Data" />
      </div>
      <div className={`${styles.postDataMainContainer} mx-auto mt-0`}>
        <Paper className={styles.Root}>
          <AppBar className={styles.AppBar} position="static" >
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
                label="Add Place"
                aria-label="Add Place"
                {...a11yProps(0)}
              />

              <Tab
                style={{ outline: "none" }}
                icon={<FeaturedPlayListIcon />}
                label="Add Post"
                aria-label="Add Posts"
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <AddPlace />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <AddPost />
            </TabPanel>
          </SwipeableViews>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default PostDataTabs;

