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
import { Paper } from "@material-ui/core";
import GlobalZoneChatDiv from "../GlobalZoneChatDiv/GlobalZoneChatDiv";
import GlobalZonePostDiv from "../GlobalZonePostDiv/GlobalZonePostDiv";
import styles from "./GlobalZoneTabs.module.css";

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

const GlobalZoneTabs = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="WaveBackground">
      <div className={`${styles.GlobalDataMainContainer} mx-auto mt-0`}>
        <Paper className={styles.Root}>
          <AppBar className={styles.AppBar} position="static">
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
                style={{ outline: "none",  }}
                icon={<ExploreIcon />}
                label="Global Posts"
                aria-label="Global Posts"
                {...a11yProps(0)}
              />

              <Tab
                style={{ outline: "none" }}
                icon={<FeaturedPlayListIcon />}
                label="Public Chatroom"
                aria-label="Public Chatroom"
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
              <GlobalZonePostDiv />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <GlobalZoneChatDiv />
            </TabPanel>
          </SwipeableViews>
        </Paper>
      </div>
    </div>
  );
};

export default GlobalZoneTabs;
