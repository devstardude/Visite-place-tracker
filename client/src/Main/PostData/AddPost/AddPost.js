import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
  CustomFileInput,
} from "../../../Shared/Inputs/Inputs";

import "./AddPost.css";

const AddPost = (props) => {
  const dataSubmitHandler = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
  };
  return (
    <div className="AddPlaceForm">
      <div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            content: "",
            file: null,
          }}
          validationSchema={Yup.object({
            username: Yup.string()
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
            file: Yup.mixed().required("Please upload a file"),
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
                label="Description"
                name="description"
                placeholder="Description here"
              />
              <CustomTextInput
                label="Content"
                name="content"
                placeholder="Content here"
              />

              <CustomFileInput
                buttonText="Pick Post Image"
                id="file"
                name="file"
                onInput={(file) => file && setFieldValue("file", file)}
              />

              <div className="AddPlaceButtonDiv">
                <button className="btn btn-dark px-4 py-2 m-3 " type="submit">
                  {props.isSubmitting ? "Submitting" : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPost;
