import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
  CustomFileInput,
  CustomSelectInput,
} from "../../../Shared/Inputs/Inputs";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import Masthead from "../../../Shared/Masthead/Masthead";
import CoverPic from "../../../assets/images/cover.jpg";
//import'./EditPost.css';

const EditPost = (props)=>{
 const auth = useContext(AuthContext);
 const { isLoading, error, sendRequest, clearError } = useHttpClient();
 const [loadedPlace, setLoadedPlace] = useState();
 const placeId = useParams().placeId;
 const history = useHistory();

 return (
   <div>
     <Masthead cover={CoverPic} title="Edit Post" />
   </div>
 );
};

export default EditPost ;