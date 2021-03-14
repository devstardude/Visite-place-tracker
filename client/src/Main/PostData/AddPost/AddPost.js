import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
  CustomFileInput,
} from "../../../Shared/Inputs/Inputs";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import { CustomSubmitButton } from "../../../Shared/CustomButton/CustomButton";
import { imageUploadHandler } from "../../../utils/utils";
import "./AddPost.css";

const AddPost = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    const data = JSON.stringify({
      title: values.title,
      description: values.description,
      content: values.content,
      tags: values.tags.split(","),
      image: await imageUploadHandler(auth.userId,values.image,0.1),
    });
    await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/posts/new`,
      "POST",
      data,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );
    setSubmitting(false);
    resetForm();
    history.push(`/user/${auth.userId}`);
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

              <div className="container mb-2">
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
      </div>
    </div>
  );
};

export default AddPost;
