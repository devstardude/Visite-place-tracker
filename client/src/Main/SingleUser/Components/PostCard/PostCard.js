import React from 'react';
import Image from "../../../../assets/images/traveller.jpg";
import { Card, ImageHeader, CardBody, CardFooter } from "react-simple-card";
import { Chip } from "@material-ui/core";
import'./PostCard.css';
import { Link } from 'react-router-dom';

const PostCard = (props)=>{
    return (
      <div class="col-12 col-md-6 col-lg-4 p-md-4 p-3">
        <Link
        // to={`/post/${props.post.id}`}
        >
          <Card className="CardDiv">
            <ImageHeader className="CardImage" alt="image" imageSrc={Image} />
            <CardBody>
              <h4>This is post </h4>
              <p>
                This is post description and has some text please dont mind me
                i'm just a text
              </p>
              {/* {props.user.bio.slice(0, 75)}{" "}
              {props.user.bio.slice(76, 77) && "... (Read More)"} */}
              <p className="mb-0 pb-0">
                {[1, 1, 1, 1, 1, 1].map((chip) => (
                  <Chip
                    style={{ marginRight: "4px" }}
                    className="my-1"
                    size="small"
                    label={`chipch`}
                    clickable
                  />
                ))}
              </p>
            </CardBody>
          </Card>
        </Link>
      </div>
    );
};

export default PostCard ;