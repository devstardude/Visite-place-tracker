import React from "react";
import PostCard from "../PostCard/PostCard";
import Loading from "../../../../Shared/Loading/Loading";
//import'./PostDiv.css';

const PostDiv = (props) => {
  const posts = props.postsList;
  if(!posts){
      <Loading/>
  }
  if (posts) {
    return (
      <div className="container">
        <div className="row">{
            posts.map((post=>(
                <PostCard post={post} {...props}/>
            )))
        }</div>
      </div>
    );
  }
};

export default PostDiv;
