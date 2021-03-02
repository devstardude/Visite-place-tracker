import React from "react";
import AppInfoCarousal from "../AppInfoCarousal/AppInfoCarousal";
import { Card, ImageHeader, CardBody } from "react-simple-card";
import Image from "../../../../assets/images/cover.jpg"
import'./AppInfo.css';

const AppInfo = (props) => {
  return (
    <div className="container-fluid Center my-2 my-md-5 pt-5">
      <div className="row">
        <div className="col-12">
          <div className="container px-0 AppInfoFirstHeading">
            <h2>Track Your Visited Places With Visité</h2>
            <hr className="mx-auto" />
            <h5 className="mx-1 px-1 mx-md-5 px-md-5">
              'A Visite' is a french word which means Visited.
              <br />
              This app lets you track your placed you've visited around the
              world, with your memories, pictures and so much more.
            </h5>
          </div>
        </div>
        <div className="col-12 my-5">
          <div className="AppInfoCarousalDiv mx-auto bg-dark">
            <AppInfoCarousal />
          </div>
        </div>
        <div className="col-12 mt-5">
          <div className="container px-0 AppInfoSecondtHeading">
            <h2>Experience More With . . .</h2>
            <hr className="mx-auto" />
            <div className="row p-3">
              <div className="col-12 col-md-4 mb-4">
                <Card className="LandingCardDiv">
                  <ImageHeader
                    className="CardImage"
                    alt="image"
                    imageSrc={Image}
                  />
                  <CardBody className="text-center">
                    <h4>Map Rendering and Geocoding</h4>
                  </CardBody>
                </Card>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <Card className="LandingCardDiv">
                  <ImageHeader
                    className="CardImage"
                    alt="image"
                    imageSrc={Image}
                  />
                  <CardBody className="text-center">
                    <h4>Tourism Blogs and Recommandations</h4>
                  </CardBody>
                </Card>
              </div>
              <div className="col-12 col-md-4 mb-4">
                <Card className="LandingCardDiv">
                  <ImageHeader
                    className="CardImage"
                    alt="image"
                    imageSrc={Image}
                  />
                  <CardBody className="text-center">
                    <h4>Global Chatroom For Like Minded Wanderers </h4>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppInfo;
