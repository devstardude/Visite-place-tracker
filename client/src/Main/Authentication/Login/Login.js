import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Paper } from "@material-ui/core";
import {
  CustomTextInput,
} from "../../../Shared/Inputs/Inputs";
import "./Login.css";
import Masthead from "../../../Shared/Masthead/Masthead";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import { CustomSubmitButton } from "../../../Shared/CustomButton/CustomButton";

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
    return <Redirect to="/"/>
  };

  return (
    <div>
      <Masthead title="Login" />
      <div className="container">
        <div className="mt-4 Center AddUserHeading">
          <h3>Welcome back Traveller.</h3>
          <hr />
          <h5>Hope you're having great adventures.</h5>
        </div>
        {error && <ErrorModal errorText={error} clicked={clearError} />}
        <div className="PaperForm my-4 mx-auto">
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
                <Form className="p-1 p-md-2">
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
                  <div className="mt-4 mb-4">
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
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Login;
