import React from 'react';
import PostCard from "../PostCard/PostCard"; 
//import'./PostDiv.css';

const PostDiv = (props)=>{
    return(
    <div className="container" >
        <div className="row">
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
        </div>
    </div>
);
};

export default PostDiv ;