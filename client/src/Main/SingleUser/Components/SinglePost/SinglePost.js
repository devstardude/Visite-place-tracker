import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../../../Shared/ErrorModal/ErrorModal";
import { useHttpClient } from "../../../../Shared/hooks/http-hook";
import Loading from "../../../../Shared/Loading/Loading";
import Masthead from "../../../../Shared/Masthead/Masthead";
import SinglePostLayout from "../../../../Shared/SinglePostLayout/SinglePostLayout";

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

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && loadedPost && <SinglePostLayout post={loadedPost} />}
      {!isLoading && !loadedPost && (
        <div>
          <ErrorModal error={error} onClear={clearError} />
          <Masthead title="Not found" />
        </div>
      )}
    </React.Fragment>
  );
};

export default SinglePost;
