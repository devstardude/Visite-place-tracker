import React, { useContext } from "react";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import Masthead from "../../../Shared/Masthead/Masthead";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Paper } from "@material-ui/core";
import {
  CustomTextInput,
  CustomFileInput,
} from "../../../Shared/Inputs/Inputs";

import "./Register.css";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const dataSubmitHandler = async(values, { setSubmitting, resetForm }) => {
    try {
      const signUpData = JSON.stringify({
        username:values.username,
        email:values.email,
        password:values.password,
        bio:values.password
      })
      const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          signUpData,
          {
            "Content-Type": "application/json",
          }
        );
         auth.login(
           responseData.userId,
           responseData.token,
           responseData.username,
           responseData.email,
           responseData.dp
         );
    } catch {}
    setSubmitting(false);
    resetForm();
    return <Redirect to="/" />;
  };

  return (
    <div>
      <Masthead title="Registration" />
      <div className="container">
        <div className="mt-4 Center AddUserHeading">
          <h3>Looks like it's your first time here.</h3>
          <hr />
          <h5>Please complete the user registration form.</h5>
        </div>
        {error && (
          <ErrorModal errorText={error} clicked={clearError} />
        )}

        <div className="AddUserForm my-4 mx-auto">
          <Paper>
            <Formik
              initialValues={{
                email: "",
                password: "",
                username: "",
                bio: "",
                // dp: null,
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Must be a valid email")
                  .required("Required"),
                password: Yup.string()
                  .min(6, "Password is too short - should be 6 chars minimum.")
                  .required("Required"),
                username: Yup.string()
                  .min(2, "Must be atleast 1 characters")
                  .max(12, "Cannot exceed 12 character")
                  .required("Required"),
                bio: Yup.string()
                  .min(1, "Must be atleast 1 characters")
                  .max(60, "Cannot exceed 60 character")
                  .required("Required"),
                // dp: Yup.mixed().required("Please upload a file"),
              })}
              onSubmit={dataSubmitHandler}
            >
              {({ setFieldValue, ...props }) => (
                <Form className="py-2">
                  <CustomTextInput
                    label="Email"
                    name="email"
                    placeholder="Email here"
                  />
                  <CustomTextInput
                  password
                    label="Password"
                    name="password"
                    placeholder="Password here"
                  />
                  <CustomTextInput
                    label="Username"
                    name="username"
                    placeholder="Username here"
                  />
                  <CustomTextInput
                    label="Bio"
                    name="bio"
                    placeholder="Bio here"
                  />
                  {/* <CustomFileInput
                    buttonText="Pick Profile Image"
                    id="file"
                    name="dp"
                    onInput={(file) => file && setFieldValue("dp", file)}
                  /> */}
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
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Register;
