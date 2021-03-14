import React from "react";
import Dp from "../../assets/images/saitamaHappy.jpg";
import Masthead from "../../Shared/Masthead/Masthead";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Fab } from "@material-ui/core";
import Footer from "../../Main/Landing/Components/Footer/Footer";

import "./AboutMe.css";

const AboutMe = (props) => {
  return (
    <React.Fragment>
      <Masthead title="Who...Me?" />
      <div className="container">
        <div className="Owner ">
          <div className="Avatar ">
            <img
              alt="..."
              className="Img-circle Img-no-padding img-responsive"
              src={Dp}
            />
          </div>
        </div>

        <div className="mt-4 Center AddUserHeading">
          <h2>
            I am a professional full stack web developer, specialised in MERN
            stack.
          </h2>
          <hr />
          <h5 className="px-2 px-md-5">
            I have worked with React, React-hooks, Node-Express, MongoDB, REST Api, and 
            Firebase in quite a few projects to have a good understanding about
            how these stack and technologies work together and make an amazing working web
            application.
          </h5>
          <hr />
          <h4>In short...</h4>
          <h4 style={{ fontWeight: "700" }}>I'm Arun Shekhar </h4>
          <h4> Just a guy who's a Developer for fun the of it.</h4>
          <div className="d-flex align-items-center justify-content-center mt-4 mt-md-5 mb-3">
            <Fab
              className="Head-fab mx-0 mx-md-1"
              size="small"
              href="https://www.instagram.com/i_m_a.r.u.n/"
              target="_blank"
            >
              <InstagramIcon />
            </Fab>
            <Fab
              className="Head-fab mx-0 mx-md-1"
              size="small"
              href="https://github.com/imdude001"
              target="_blank"
            >
              <GitHubIcon />
            </Fab>
            <Fab
              className="Head-fab mx-0 mx-md-1"
              size="small"
              href="https://linkedin.com/in/arun-shekhar"
              target="_blank"
            >
              <LinkedInIcon />
            </Fab>
            <Fab
              className="Head-fab mx-0 mx-md-1"
              size="small"
              href="https://www.youtube.com/channel/UCEL_3xlrevncI0OWEzaIY3Q"
              target="_blank"
            >
              <YouTubeIcon />
            </Fab>
          </div>
          <Footer/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutMe;
