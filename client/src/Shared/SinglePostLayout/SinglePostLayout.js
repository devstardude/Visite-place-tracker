import React from "react";
import Masthead from "../Masthead/Masthead";
import { Chip } from "@material-ui/core";
import { Card, CardBody } from "react-simple-card";
import Markdown from "react-markdown";
import'./SinglePostLayout.css';

const SinglePostLayout = (props) => {
  const { title, description, sanitizedContent, tags, image } = props.post;
  return (
    <div>
      <Masthead title="Have a good read :)" cover={image} />
      <div style={{ height: "100vh" }}>
        <div className="PaperForm SinglePostLayoutDiv mx-auto">
          <Card className="SinglePostLayoutCard ">
            <CardBody>
              <h1 style={{ fontWeight: "bold" }}>{title} </h1>
              <h6>
                {"("}
                {description}
                {")"}
              </h6>
              <p className="text-muted">
                Posted on :{" "}
                {props.post.time
                  ? props.post.time
                  : props.post.createdAt.toDate().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
              </p>

              <hr />
              <div className="SinglePostLayoutContentDiv">
                <Markdown
                  className="SinglePostLayoutContentDiv"
                  escapeHtml={false}
                  source={
                    sanitizedContent
                      ? sanitizedContent
                      : props.post.firebaseContent
                  }
                />
              </div>

              <br />
              <p className="mb-0 pb-0">
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    style={{ marginRight: "5px" }}
                    className="my-1"
                    size="small"
                    label={tag}
                    clickable
                  />
                ))}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SinglePostLayout;
