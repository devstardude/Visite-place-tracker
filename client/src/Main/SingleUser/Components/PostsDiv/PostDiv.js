import React from "react";
import PostCard from "../PostCard/PostCard";
import Loading from "../../../../Shared/Loading/Loading";
//import'./PostDiv.css';

const PostDiv = (props) => {
  const posts = props.postsList;
  if (!posts) {
    <Loading />;
  }
  if (posts && posts.length === 0) {
    return (
      <div className="container">
        <div className="row"> No posts to show </div>
      </div>
    );
  }
  if (posts) {
    return (
      <div className="container">
        <div className="row">
          {posts.map((post) => (
            <PostCard post={post} {...props} />
          ))}
        </div>
      </div>
    );
  }
};

export default PostDiv;
