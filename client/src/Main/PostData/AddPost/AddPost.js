import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
  CustomFileInput
} from "../../../Shared/Inputs/Inputs";

import "./AddPost.css";

const AddPost = (props) => {
  const dataSubmitHandler = (values, { setSubmitting, resetForm }) => {
    const data = {
      title:values.title,
      description:values.description,
      content:values.content,
      tags:values.tag.split(',')
    }
    console.log(data);
    setSubmitting(false);
    // resetForm();
  };
  return (
    <div className="AddPlaceForm">
      <div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            content: "",
            tag: "",
            file: null,
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
            // file: Yup.mixed().required("Please upload a file"),
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
                name="tag"
                placeholder="Tags seperated by commas.(Don't put spaces in between)"
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
