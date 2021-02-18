import React from 'react';
import PostCard from "../PostCard/PostCard"; 
//import'./PostDiv.css';

const PostDiv = (props)=>{
    return(
    <div className="container" >
        <div className="row">
            <div className="col-12 my-4 px-3 px-md-5">
                <PostCard/>
            </div>
            <div className="col-12 my-4 px-3 px-md-5">
                <PostCard/>
            </div>
            <div className="col-12 my-4 px-3 px-md-5">
                <PostCard/>
            </div>
            <div className="col-12 my-4 px-3 px-md-5">
                <PostCard/>
            </div>
        </div>
    </div>
);
};

export default PostDiv ;