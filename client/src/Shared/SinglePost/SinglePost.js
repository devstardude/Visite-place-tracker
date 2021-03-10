import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";
import Loading from "../Loading/Loading";
import Masthead from "../Masthead/Masthead";
import Spinner from "../Spinner/Spinner";
import { Chip } from "@material-ui/core";
import { Card, CardBody } from "react-simple-card";
import Markdown from "react-markdown";
import "./SinglePost.css";

const SinglePost = (props) => {
  const [loadedPost, setLoadedPost] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const postId = useParams().postId;
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/post/${postId}`
        );
        setLoadedPost(responseData.post);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, postId]);

  if (isLoading) {
    <Loading />;
  }
  if (loadedPost) {
    return (
      <div>
        <Masthead title="Have a good read :)" cover={loadedPost.image} />
        <div style={{ height: "100vh" }}>
          <div className="PaperForm SinglePostDiv mx-auto">
            <Card className="SinglePostCard ">
              {console.log(loadedPost)}
              <CardBody>
                <h1 style={{ fontWeight: "600" }}>{loadedPost.title} </h1>
                <h6>
                  {"("}
                  {loadedPost.description}
                  {")"}
                </h6>
                <p className="text-muted">Posted on : {loadedPost.time}</p>
                <hr />
                <div className="SinglePostContentDiv">
                  <Markdown
                    escapeHtml={false}
                    source={loadedPost.sanitizedContent}
                  />
                </div>

                <br />
                <p className="mb-0 pb-0">
                  {loadedPost.tags.map((tag) => (
                    <Chip
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
  }
  if (!loadedPost && !isLoading) {
    return (
      <div>
        <ErrorModal error={error} onClear={clearError} />
        <Masthead title="Not found" />
      </div>
    );
  }
  return (
    <div>
      <Masthead title="Loading" />
      <br />
      <Spinner color="black" />
    </div>
  );
};

export default SinglePost;
