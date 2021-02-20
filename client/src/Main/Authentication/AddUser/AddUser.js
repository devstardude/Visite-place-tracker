import React from 'react';
import CoverPic from "../../../assets/images/cover.jpg"
import Masthead from '../../../Shared/Masthead/Masthead';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Paper } from "@material-ui/core";
import { CustomTextInput,CustomFileInput } from "../../../Shared/Inputs/Inputs";

import'./AddUser.css';

const AddUser = (props)=>{
     const dataSubmitHandler = (values, { setSubmitting, resetForm }) => {
       console.log(values);
       setSubmitting(false);
       resetForm();
     };
    
    return (
      <div>
        <Masthead cover={CoverPic} title="Registration" />
        <div className="container">
          <div className="mt-4 Center AddUserHeading">
            <h3>Looks like it's your first time here.</h3>
            <hr />
            <h5>
              Please complete the user registration form, this is a one time
              process.
            </h5>
          </div>
          <div className="AddUserForm my-4 mx-auto">
            <Paper>
              <Formik
                initialValues={{
                  username: "",
                  bio: "",
                  file: null,
                }}
                validationSchema={Yup.object({
                  username: Yup.string()
                    .min(2, "Must be atleast 1 characters")
                    .max(12, "Cannot exceed 12 character")
                    .required("Required"),
                  bio: Yup.string()
                    .min(1, "Must be atleast 1 characters")
                    .max(60, "Cannot exceed 60 character")
                    .required("Required"),
                  file: Yup.mixed().required("Please upload a file"),

                  //   file: Yup.mixed().required("Please upload a file"),
                })}
                onSubmit={dataSubmitHandler}
              >
                {({ setFieldValue, ...props }) => (
                  <Form>
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
                    <CustomFileInput
                      buttonText="Pick Profile Image"
                      id="file"
                      name="file"
                      onInput={(file) => file && setFieldValue("file", file)}
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

export default AddUser ;