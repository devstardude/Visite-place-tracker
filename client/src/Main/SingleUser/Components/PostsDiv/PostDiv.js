import React from "react";
import PostCard from "../PostCard/PostCard";
import Spinner from "../../../../Shared/Spinner/Spinner";
//import'./PostDiv.css';

const PostDiv = (props) => {
  if (props.loading) {
    return (
      <div className="container">
        <div className="row">
          <Spinner />
        </div>
      </div>
    );
  }
  if (!props.postsList || props.postsList.length === 0) {
    return (
      <div className="container Center pt-4">
        <h4 style={{ color: "#ffffff" }}>No Posts to show</h4>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        {props.postsList &&
          props.postsList.map((post) => (
            <PostCard key={post.id} post={post} {...props} />
          ))}
      </div>
    </div>
  );
};

export default PostDiv;
