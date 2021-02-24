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
          <h4>{props.place.title} </h4>
          <p className="text-muted  m-0 p-0">
            {"( "}
            {props.place.address}
            {" )"}
          </p>
          <p className="text-muted m-0 p-0">Type: {props.place.typeOfPlace}</p>
          <p className="mt-2 mb-0 p-0">{props.place.description}</p>
        </CardBody>
        <CardFooter>
          <div className="d-flex PlaceCardButtons mx-auto">
            <MapModal address={props.place.address} coordinates={props.place.coordinates} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlaceCard;
