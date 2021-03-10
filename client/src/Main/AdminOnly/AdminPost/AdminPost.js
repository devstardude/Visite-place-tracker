import React, { useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router";
import { AuthContext } from "../../../Shared/Context/auth-context";
import Masthead from "../../../Shared/Masthead/Masthead";
import {
  CustomTextInput,
  CustomFileInput,
} from "../../../Shared/Inputs/Inputs";
import { CustomSubmitButton } from "../../../Shared/CustomButton/CustomButton";
import { Button, Paper } from "@material-ui/core";
import {
  firestore,
  signInWithGoogle,
  logOut,
} from "../../../firebase/firebase";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import { useAuthState } from "react-firebase-hooks/auth";
import "./AdminPost.css";

const googleAuth = firebase.auth();
const AdminPost = (props) => {
  const [user] = useAuthState(googleAuth);
  const [error, setError] = React.useState(null);
  const auth = useContext(AuthContext);
  const clearErrorHandler = () => {
    setError(null);
  };
  if (auth.userId === process.env.REACT_APP_ADMIN_ID) {
    if (user) {
      const postRef = firestore.collection("global-post");
      const dataSubmitHandler = async (
        values,
        { setSubmitting, resetForm }
      ) => {
        const data = {
          title: values.title,
          description: values.description,
          content: values.content,
          tags: values.tags.split(","),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        try {
          await postRef.add(data).then((res)=>(console.log("res",res))).catch((err) => {
            setError(err.message);
          });
        } catch (err) {}
        setSubmitting(false);
        // resetForm();
      };
      return (
        <div>
          <Masthead title="Admin Post" />
          <div className="PaperForm my-4  mx-auto">
            <Paper className="pb-2">
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  content: "",
                  tags: "",
                  image: null,
                }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    .min(2, "Must be atleast 1 characters")
                    .max(12, "Cannot exceed 12 character")
                    .required("Required"),
                  description: Yup.string()
                    .min(1, "Must be atleast 1 characters")
                    .max(60, "Cannot exceed 60 character")
                    .required("Required"),
                  content: Yup.string()
                    .min(1, "Must be atleast 1 characters")
                    .max(60, "Cannot exceed 60 character")
                    .required("Required"),
                  // image: Yup.mixed().required("Please upload an image"),
                })}
                onSubmit={dataSubmitHandler}
              >
                {({ setFieldValue, ...props }) => (
                  <Form>
                    <CustomTextInput
                      label="Title"
                      name="title"
                      placeholder="Title here"
                    />
                    <CustomTextInput
                      multiline
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
                    <CustomTextInput
                      multiline
                      label="Tags"
                      name="tags"
                      placeholder="Tags seperated by commas.(Don't put spaces in between)"
                    />
                    <CustomFileInput
                      buttonText="Pick Post Image"
                      id="file"
                      name="image"
                      onInput={(file) => file && setFieldValue("image", file)}
                    />

                    <div className="container my-2">
                      <CustomSubmitButton
                        isDisabled={props.isSubmitting}
                        isLoading={props.isSubmitting}
                        type="submit"
                        text={props.isSubmitting ? "Submitting" : "Submit"}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="Center mt-4" >
                <Button onClick={logOut} className="btn px-2">Log out</Button>
              </div>
            </Paper>
            {error && (
              <ErrorModal errorText={error} clicked={clearErrorHandler} />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{ height: "100vh" }}
          className="jumbotron d-flex align-items-center Center justify-content-center bg-dark"
        >
            <div
              className="card text-center "
              style={{ width: "20rem" }}
            >
              <div className="card-header">Hidden Route {"( ͡° ͜ʖ ͡°)"}</div>
              <div className="card-body">
                <h5 className="card-title">Welcome Admin</h5>
                <p className="card-text" style={{ color: "black" }}>
                  Login with Google
                </p>
                <Link
                  to="/login"
                  className="btn btn-dark"
                  onClick={signInWithGoogle}
                >
                  Click Here
                </Link>
              </div>
            </div>
        </div>
      );
    }
  }

  return <Redirect to="/" />;
};

export default AdminPost;
