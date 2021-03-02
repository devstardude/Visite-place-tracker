import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import { AuthContext } from "../../../../Shared/Context/auth-context";
import SendIcon from "@material-ui/icons/Send";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomTextInput } from "../../../../Shared/Inputs/Inputs";
import firebase from "firebase/app";
import {firestore} from "../../../../firebase/firebase";
// import "./SendMessageModal.css";



const SendMessageModal = (props) => {
  const auth = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const messagesRef = firestore.collection(`user-${props.id}`);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    await messagesRef.add({
      text: values.message,
      senderId: auth.userId,
      senderName:auth.username,
      senderDp: auth.dp,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setSubmitting(false);
    resetForm();
    setOpen(false);
  };;
  return (
    <div>
      <button
        onClick={handleOpen}
        className="btn LikeProfileButton rounded-pill btn-outline-primary my-2 mx-2"
      >
        <SendIcon /> Send Text
      </button>
      <Modal
        className="d-flex align-content-center DeleteBoxModel"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className="container align-self-center DeleteBoxContainer p-0">
            <h2 className="pt-3 Center">Send Your Love 💌</h2>
            <div>
              
              <Formik
                initialValues={{
                  message: "",
                }}
                validationSchema={Yup.object({
                  message: Yup.string()
                    .min(1, "Must be atleast 1 characters")
                    .required("Required"),
                })}
                onSubmit={dataSubmitHandler}
              >
                {({ setFieldValue, ...props }) => (
                  <Form>
                    <CustomTextInput
                      multiline
                      rowsMax={5}
                      label="Message"
                      name="message"
                      placeholder="Message here"
                    />
                    <div className="p-3 Center">
                      <button
                        onClick={handleClose}
                        type="button"
                        className="btn btn-outline-secondary px-4 py-2  "
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary px-4 py-2 m-3 "
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
        </Zoom>
      </Modal>
    </div>
  );
};

export default SendMessageModal;
