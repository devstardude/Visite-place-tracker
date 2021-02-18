import React from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import'./Footer.css';

const Footer = (props)=>{
    return (
      <div className="container Center">
        <div className="mb-4" >
          © {new Date().getFullYear()}, Made with {" "} <FavoriteIcon className="Heart" fontSize="small" />{" "}
          by Devstar
        </div>
      </div>
    );
};

export default Footer ;