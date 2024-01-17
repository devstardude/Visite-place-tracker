import React from 'react';
import { Chip } from "@material-ui/core";
import { Card, ImageHeader, CardBody} from "react-simple-card";
import { Link } from "react-router-dom";

import'./GlobalZonePostCard.css';

const GlobalZonePostCard = (props)=>{
    return (
      <div className="mb-5">
        <Card className="GlobalZoneCardDiv ">
          <Link style={{ color: "black" }} to={`/globalzone/post/${props.post.uid}`}>
            <ImageHeader
              className="GlobalZoneCardImage"
              alt="image"
              imageSrc={props.post.image}
            />
            <CardBody>
              <h4>{props.post.title} </h4>
              <p>
                {props.post.description.slice(0, 30)}{" "}
                {props.post.description.slice(31, 32) && "... (Read More)"}
              </p>

              <p className="mb-0 pb-0">
                {props.post.tags.map((tag) => (
                  <Chip
                    style={{ marginRight: "4px" }}
                    className="my-1"
                    size="small"
                    label={tag}
                    clickable
                  />
                ))}
              </p>
            </CardBody>
          </Link>
        </Card>
      </div>
    );
};

export default GlobalZonePostCard ;