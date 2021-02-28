import React,{useContext} from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
  CustomFileInput
} from "../../../Shared/Inputs/Inputs";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";

import "./AddPost.css";

const AddPost = (props) => {
   const auth = useContext(AuthContext);
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dataSubmitHandler = async(values, { setSubmitting, resetForm }) => {

    const data = JSON.stringify({
      title:values.title,
      description:values.description,
      content:values.content,
      tags:values.tags.split(',')
    })
    await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/posts/new`,
      "POST",
      data,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );
    console.log(data);
    setSubmitting(false);
    // resetForm();
  };
  return (
    <div className="AddPlaceForm">
      <div>
        {error && <ErrorModal errorText={error} clicked={clearError} />}
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
