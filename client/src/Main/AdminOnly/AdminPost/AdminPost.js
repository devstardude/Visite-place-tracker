import React, { useContext } from "react";
import { Link,useHistory } from "react-router-dom";
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
import { imageUploadHandler } from "../../../utils/utils";

const googleAuth = firebase.auth();
const AdminPost = (props) => {
  const history = useHistory();
  const [user] = useAuthState(googleAuth);
  const [error, setError] = React.useState(null);
  const auth = useContext(AuthContext);
  const clearErrorHandler = () => {
    setError(null);
  };
  const signInWithGoogleHandler =async()=>{
    await signInWithGoogle();
    history.push("/admin/post")
  }
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
          firebaseContent: values.content,
          tags: values.tags.split(","),
          image: await imageUploadHandler(auth.userId, values.image, 0.2),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        try {
          await postRef.add(data).catch((err) => {
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
                    .min(4, "Must be atleast 4 characters")
                    .max(200, "Cannot exceed 200 character")
                    .required("Required"),
                  description: Yup.string()
                    .min(4, "Must be atleast 4 characters")
                    .max(400, "Cannot exceed 400 character")
                    .required("Required"),
                  content: Yup.string()
                    .min(4, "Must be atleast 4 characters")
                    .required("Required"),
                  image: Yup.mixed().required("Please upload an image"),
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
              <div className="Center mt-3">
                <Button onClick={logOut} className="btn px-2">
                  Log out
                </Button>
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
          <div className="card text-center " style={{ width: "20rem" }}>
            <div className="card-header">Hidden Route {"ಠ‿ಠ"}</div>
            <div className="card-body">
              <h5 className="card-title">Welcome Admin</h5>
              <p className="card-text" style={{ color: "black" }}>
                Login with Google
              </p>
              <Link
                to="/login"
                className="btn btn-dark"
                onClick={signInWithGoogleHandler}
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
