import React from 'react';
import GlobalZonePostCard from '../GlobalZonePostCard/GlobalZonePostCard';

import'./GlobalZonePostDiv.css';
const post = {title:"heheheheheh",description:"pepepepepe",tags:["pepe","ppepe"]}
const GlobalZonePostDiv = (props)=>{
    return(
    <div className="GlobalZonePostDiv p-3">
        <GlobalZonePostCard post={post}/>
        <GlobalZonePostCard post={post}/>
        <GlobalZonePostCard post={post}/>
        <GlobalZonePostCard post={post}/>
    </div>
);
};

export default GlobalZonePostDiv ;