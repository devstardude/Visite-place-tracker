import React, { useContext } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Paper } from "@material-ui/core";
import {
  CustomTextInput,
} from "../../../Shared/Inputs/Inputs";
import CoverPic from "../../../assets/images/cover.jpg";
import "./Login.css";
import Masthead from "../../../Shared/Masthead/Masthead";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const dataSubmitHandler = async(values, { setSubmitting, resetForm }) => {
     try {
       const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: values.email,
            password: values.password,
          }),
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
     }catch{}
    setSubmitting(false);
    resetForm();
  };

  return (
    <div>
      <Masthead cover={CoverPic} title="Login" />
      <div className="container">
        <div className="mt-4 Center AddUserHeading">
          <h3>Welcome back Traveller.</h3>
          <hr />
          <h5>Hope you're having a great adventure.</h5>
        </div>
        {error && <ErrorModal errorText={error} clicked={clearError} />}
        <div className="AddUserForm my-4 mx-auto">
          <Paper>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Must be a valid email")
                  .required("Required"),
                password: Yup.string()
                  .min(6, "Password is too short - should be 6 chars minimum.")
                  .required("Required"),
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

export default Login;
