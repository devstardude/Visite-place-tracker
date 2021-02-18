import React from 'react';
import Image from "../../../../assets/images/traveller.jpg";
import'./PostCard.css';

const PostCard = (props)=>{
    return (
      <div className="d-flex PostCardCard rounded p-3">
        <div className="d-none d-md-inline rounded PostCardImageDiv ">
          <img src={Image} alt="..." className="rounded PostCardImage"></img>
        </div>
        <div className=" px-1 px-md-3">
          <h3 className="bold">Title</h3>
          <p className="text">
            Lorem Ipsuim asdjpo wei-w0ie adlkasdl ajdla asdjlaksd ajdlajdl
          </p>
          <span className="text-muted">2 Feb 2021</span>
        </div>
      </div>
    );
};

export default PostCard ;