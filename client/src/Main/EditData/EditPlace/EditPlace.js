import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomTextInput } from "../../../Shared/Inputs/Inputs";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import Masthead from "../../../Shared/Masthead/Masthead";
import { Paper } from "@material-ui/core";
import Loading from "../../../Shared/Loading/Loading";
import "./EditPlace.css";

const EditPlace = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId]);

  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/update/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: values.title,
          description: values.description,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`/user/${auth.userId}`);
    } catch (err) {}
    setSubmitting(false);
    resetForm();
  };
  if (isLoading) {
    return <Loading />;
  }
   if (!loadedPlace && !error) {
     return (
       <div>
         <div>
           <Masthead  title="Edit Place" />
         </div>
         <div className="Center">
           <h2 className="pt-3">Could not find place!</h2>
           <Link to={`/user/${auth.userId}`}>
             <button className="mt-3 btn btn-outline-secondary">Go Back</button>
           </Link>
         </div>
       </div>
     );
   }
  return (
    <div>
      <div>
        <Masthead  title="Edit Place" />
      </div>
      <div className="WaveBackground">
        <div className="container">
          <div className="mt-4 Center EditHeading">
            <h3>Only limited fields are editable.</h3>
            <hr />
          </div>
          {error && <ErrorModal errorText={error} clicked={clearError} />}
          <div className="AddUserForm my-4 mx-auto">
            <Paper>
              {!isLoading && loadedPlace && (
                <Formik
                  initialValues={{
                    title: loadedPlace.title,
                    description: loadedPlace.description,
                  }}
                  validationSchema={Yup.object({
                    title: Yup.string()
                      .min(4, "Must be atleast 4 characters")
                      .max(100, "Cannot exceed 100 character")
                      .required("Required"),
                    description: Yup.string()
                      .min(4, "Must be atleast 4 characters")
                      .max(200, "Cannot exceed 200 character")
                      .required("Required"),
                  })}
                  onSubmit={dataSubmitHandler}
                >
                  {({ setFieldValue, ...props }) => (
                    <Form className="py-2">
                      <CustomTextInput
                        label="Title"
                        name="title"
                        placeholder="Title"
                      />
                      <CustomTextInput
                        label="Description"
                        name="description"
                        placeholder="Description here"
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
              )}
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlace;
