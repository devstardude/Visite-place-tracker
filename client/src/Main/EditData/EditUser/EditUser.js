import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory} from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomTextInput } from "../../../Shared/Inputs/Inputs";
import { AuthContext } from "../../../Shared/Context/auth-context";
import { useHttpClient } from "../../../Shared/hooks/http-hook";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import Masthead from "../../../Shared/Masthead/Masthead";
import CoverPic from "../../../assets/images/cover.jpg";
import { Paper } from "@material-ui/core";
import Loading from "../../../Shared/Loading/Loading";
import "./EditUser.css";

const EditUser = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const userId = auth.userId
  const history = useHistory();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`
        );
        setLoadedUser(responseData.user[0]);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, userId]);

  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/update/`,
        "PATCH",
        JSON.stringify({
          username: values.username,
          bio: values.bio,
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
  if (!loadedUser && !error) {
    return (
      <div>
        <div>
          <Masthead title="Edit User" />
        </div>
        <div className="Center">
          <h2 className="mt-3">Could not find User!</h2>
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
        <Masthead title="Edit User" />
      </div>
      <div className="WaveBackground">
        <div className="container">
          <div className="pt-4 Center EditHeading">
            <h3>Only limited fields are editable.</h3>
            <hr />
          </div>
          {error && <ErrorModal errorText={error} clicked={clearError} />}
          <div className="AddUserForm my-4 mx-auto">
            {console.log(loadedUser)}
            <Paper>
              {!isLoading && loadedUser && (
                <Formik
                  initialValues={{
                    username: loadedUser.username,
                    bio: loadedUser.bio,
                  }}
                  validationSchema={Yup.object({
                    username: Yup.string()
                      .min(2, "Must be atleast 2 characters")
                      .max(12, "Cannot exceed 12 character")
                      .required("Required"),
                    bio: Yup.string()
                      .min(2, "Must be atleast 1 characters")
                      .max(200, "Cannot exceed 200 character")
                      .required("Required"),
                  })}
                  onSubmit={dataSubmitHandler}
                >
                  {({ setFieldValue, ...props }) => (
                    <Form className="py-2">
                      <CustomTextInput
                        label="Username"
                        name="username"
                        placeholder="Username"
                      />
                      <CustomTextInput
                        label="Bio"
                        name="bio"
                        placeholder="Bio here"
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

export default EditUser;
