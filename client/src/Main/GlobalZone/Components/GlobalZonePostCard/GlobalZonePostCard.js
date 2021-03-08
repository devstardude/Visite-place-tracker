import React from 'react';
import { Chip } from "@material-ui/core";
import { Card, ImageHeader, CardBody, CardFooter } from "react-simple-card";
import { Link } from "react-router-dom";
import Cover from "../../../../assets/images/cover.jpg";

import'./GlobalZonePostCard.css';

const GlobalZonePostCard = (props)=>{
    return (
      <div className="mb-5">
        <Card className="GlobalZoneCardDiv ">
          <Link style={{ color: "black" }} to={`/post/${props.post.id}`}>
            <ImageHeader
              className="GlobalZoneCardImage"
              alt="image"
              imageSrc={Cover}
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

          {/* {currentUserCheck && (
            <CardFooter>
              <div className="container d-flex justify-content-between GlobalZonePostCardFooterButton">
                <Link to={`/edit/post/${props.post.id}`}>
                  <button className="btn btn-outline-info">Edit</button>
                </Link>
                <DeleteConfirmationModal
                  deleteWarning="Are you sure you want to delete this post?"
                  deleteHandler={deleteHandler}
                />
              </div>
            </CardFooter>
          )} */}
        </Card>
      </div>
    );
};

export default GlobalZonePostCard ;