import React from "react";
import { Card, ImageHeader, CardBody, CardFooter } from "react-simple-card";
import Image from "../../../../assets/images/traveller.jpg";
import MapModal from "../MapModal/MapModal";
import "./PlaceCard.css";

const PlaceCard = (props) => {
  return (
    <div className="mx-auto SingelUserPlaceCard">
      <Card className="CardDiv">
        <ImageHeader className="CardImage" alt="image" imageSrc={Image} />
        <CardBody className="text-center">
          <h4>Name </h4>
          <p>Lalal lalala lalala lalala lala la la la lalalala</p>
        </CardBody>
        <CardFooter>
          <div className="d-flex PlaceCardButtons mx-auto">
          <MapModal/>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlaceCard;
