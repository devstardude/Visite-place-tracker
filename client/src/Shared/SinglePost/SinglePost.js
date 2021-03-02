import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";
import Loading from "../Loading/Loading";
import Masthead from "../Masthead/Masthead";
//import'./SinglePost.css';

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
        <Masthead title={loadedPost.title} cover={loadedPost.image} />
        <div className="container">
        <div>
            <h4>{loadedPost.title}</h4>
            <p className="text-muted" >{loadedPost.description}</p>
            <p className="" >{loadedPost.content}</p>
        </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <Masthead title="Loading" />
    </div>
  );
};

export default SinglePost;