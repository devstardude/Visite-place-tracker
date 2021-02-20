import React from 'react';

import'./Masthead.css';

const Masthead = (props)=>{
    return (
      <div
        className="MastheadCover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${props.cover})`,
        }}
      >
        <div className="my-auto">
          <h1>{props.title}</h1>
        </div>
      </div>
    );
};

export default Masthead ;