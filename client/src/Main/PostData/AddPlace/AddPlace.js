import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PlaceSearchBox from "../PlaceSearchBox/PlaceSearchBox";
import Switch from "@material-ui/core/Switch";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
  CustomFileInput,
  CustomSelectInput,
} from "../../../Shared/Inputs/Inputs";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import { imageUploadHandler } from "../../../utils/utils";
import { CustomSubmitButton } from "../../../Shared/CustomButton/CustomButton";
import "./AddPlace.css";

const AddPlace = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const [placeSearch, setPlaceSearch] = useState(null);
  const [state, setState] = React.useState({
    PostWishlistSwitch: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = JSON.stringify({
        title: values.title,
        description: values.description,
        address:
          placeSearch.address.freeformAddress +
          ", " +
          placeSearch.address.country,
        image: await imageUploadHandler(auth.userId,values.image,0.1),
        coordinates: placeSearch.position,
        typeOfPlace: values.typeOfPlace,
        wishlist: state.PostWishlistSwitch,
      });
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        data,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    setSubmitting(false);
    // resetForm();
    // history.push(`/user/${auth.userId}`);
  };
  const PlaceSearchResultHandler = (result) => {
    setPlaceSearch(result);
  };
  const resetPlaceSearchHandler = () => {
    setPlaceSearch(null);
  };

  const CustomClear = ({ onClear }) => {
    return (
      <div
        className="d-flex my-auto CursorPointer"
        onClick={resetPlaceSearchHandler}
      >
        <div onClick={resetPlaceSearchHandler}>
          <div onClick={onClear}>
            <h4>x</h4>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="AddPlaceForm">
      {error && <ErrorModal errorText={error} clicked={clearError} />}
      <div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            image: null,
            typeOfPlace: "",
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
            typeOfPlace: Yup.string()
              .oneOf(["urban", "nature", "sea", "other"])
              .required("Required"),
            // file: Yup.mixed().required("Please upload a file"),
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
              <CustomSelectInput name="typeOfPlace" />
              <CustomFileInput
                buttonText="Pick Place Image"
                id="file"
                name="image"
                onInput={(file) => file && setFieldValue("image", file)}
              />
              <div className="m-1 py-0">
                <Switch
                  checked={state.PostWishlistSwitch}
                  onChange={handleChange}
                  name="PostWishlistSwitch"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <p className="d-inline">Turn on to wishlist place.</p>
              </div>
              <div className="AddPlaceButtonDiv">
                <CustomSubmitButton
                  isDisabled={
                    props.isSubmitting || (placeSearch === null && true)
                  }
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

export default AddPlace;
