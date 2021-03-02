import React, { useState, useContext,useEffect } from "react";
import { useHistory, useParams ,Link} from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
} from "../../../Shared/Inputs/Inputs";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import Loading from "../../../Shared/Loading/Loading";
import Masthead from "../../../Shared/Masthead/Masthead";
import CoverPic from "../../../assets/images/cover.jpg";
import { Paper } from "@material-ui/core";
import'./EditPost.css';

const EditPost = (props)=>{
 const auth = useContext(AuthContext);
 const { isLoading, error, sendRequest, clearError } = useHttpClient();
 const [loadedPost, setLoadedPost] = useState();
 const postId = useParams().postId;
 const history = useHistory();
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/post/${postId}`
        );
        setLoadedPost(responseData.post);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, postId]);

  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/update/${postId}`,
        "PATCH",
        JSON.stringify({
          title: values.title,
          description: values.description,
          content:values.content
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`/global/users/${auth.userId}`);
    } catch (err) {}
    setSubmitting(false);
    resetForm();
  };
 if (isLoading) {
   return <Loading />;
 }
 if (!loadedPost && !error) {
   return (
     <div>
       <div>
         <Masthead cover={CoverPic} title="Edit Post" />
       </div>
       <div className="Center">
         <h2 className="mt-3">Could not find post!</h2>
         <Link to={`/global/users/${auth.userId}`}>
           <button className="mt-3 btn btn-outline-secondary">Go Back</button>
         </Link>
       </div>
     </div>
   );
 }

 return (
   <div>
     <div>
       <Masthead cover={CoverPic} title="Edit Post" />
     </div>
     <div className="container">
       <div className="mt-4 Center EditHeading">
         <h3>Only limited fields are editable.</h3>
         <hr />
       </div>
       {error && <ErrorModal errorText={error} clicked={clearError} />}
       <div className="AddUserForm my-4 mx-auto">
         <Paper>
           {!isLoading && loadedPost && (
             <Formik
               initialValues={{
                 title: loadedPost.title,
                 description: loadedPost.description,
                 content: loadedPost.content,
               }}
               validationSchema={Yup.object({
                 title: Yup.string()
                   .min(1, "should be 1 charactor minimum")
                   .required("Required"),
                 description: Yup.string()
                   .min(1, "should be 1 chars minimum.")
                   .required("Required"),
                 content: Yup.string().min(1, "should be 1 chars minimum."),
               })}
                onSubmit={dataSubmitHandler}
             >
               {({ setFieldValue, ...props }) => (
                 <Form className="py-2">
                   <CustomTextInput
                     label="Title"
                     name="title"
                     placeholder="Title"
                   />
                   <CustomTextInput
                     label="Description"
                     name="description"
                     placeholder="Description here"
                   />
                   <CustomTextInput
                     multiline
                     label="Content"
                     name="content"
                     placeholder="Content here"
                   />
                   <div className="AddUserButtonDiv">
                     <button
                       className="btn btn-dark px-4 py-2 m-3 "
                       type="submit"
                     >
                       {props.isSubmitting ? "Submitting" : "Submit"}
                     </button>
                   </div>
                 </Form>
               )}
             </Formik>
           )}
         </Paper>
       </div>
     </div>
   </div>
 );
};

export default EditPost ;