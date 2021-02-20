import React, { useState } from "react";
import PlaceSearchBox from "../PlaceSearchBox/PlaceSearchBox";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
  CustomFileInput,
} from "../../../Shared/Inputs/Inputs";

import "./AddPlace.css";

const AddPlace = (props) => {
  const [placeSearch, setPlaceSearch] = useState(null);

  const dataSubmitHandler = (values, { setSubmitting, resetForm }) => {
    const data = {
      ...values,
      address:
        placeSearch.address.freeformAddress +
        ", " +
        placeSearch.address.country,
      position: placeSearch.position,
    };
    console.log(data);
    setSubmitting(false);
    resetForm();
  };
  const PlaceSearchResultHandler = (result) => {
    setPlaceSearch(result);
  };
  const resetPlaceSearchHandler = () => {
    setPlaceSearch(null);
  };

  function CustomClear({ onClear }) {
    return (
      <div className="d-flex my-auto" onClick={resetPlaceSearchHandler}>
        <div onClick={resetPlaceSearchHandler}>
          <div onClick={onClear}>
            <h4>x</h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="AddPlaceForm">
      <div>
        <Formik
          initialValues={{
            title: "",
            description: "",
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
            file: Yup.mixed().required("Please upload a file"),
          })}
          onSubmit={dataSubmitHandler}
        >
          {({ setFieldValue, ...props }) => (
            <Form>
              <div className="m-3 py-0">
                <PlaceSearchBox
                  CustomClear={CustomClear}
                  searchResult={PlaceSearchResultHandler}
                />
              </div>
              <CustomTextInput
                label="Title"
                name="title"
                placeholder="Title here"
              />
              <CustomTextInput
                label="Description"
                name="description"
                placeholder="Description here"
              />
              <CustomFileInput
                buttonText="Pick Profile Image"
                id="file"
                name="file"
                onInput={(file) => file && setFieldValue("file", file)}
              />
              <div className="AddPlaceButtonDiv">
                <button
                  disabled={placeSearch === null && true}
                  className="btn btn-dark px-4 py-2 m-3 "
                  type="submit"
                >
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

export default AddPlace;
