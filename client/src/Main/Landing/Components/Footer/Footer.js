import React from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import'./Footer.css';
import { useHistory } from 'react-router-dom';

const Footer = (props)=>{
  const history = useHistory()
  const adminRedirectHandler=()=>{
    history.push("/admin/post")
  }
    return (
      <div className="container Center">
        <div className="mb-4">
          © {new Date().getFullYear()}, Made with{" "}
          <FavoriteIcon className="Heart" fontSize="small" /> by
          <span onClick={adminRedirectHandler}> Devstar</span>
        </div>
      </div>
    );
};

export default Footer ;