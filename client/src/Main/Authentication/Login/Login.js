import React from "react";
import {Redirect} from "react-router-dom"
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithGoogle } from "../../../firebase/firebase";
import CoverPic from "../../../assets/images/cover.jpg";
import "./Login.css";
import Masthead from "../../../Shared/Masthead/Masthead";

const Login = (props) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if(user){
    return(
      <Redirect to="/global/users"/>
    )
  }
  return (
    <div>
      <Masthead cover={CoverPic} title="Login" />
      <div className="Center mt-5 pt-4">
        <div className="card text-center mx-auto" style={{ width: "18rem" }}>
          <div className="card-header">Let's Go</div>
          <div className="card-body">
            <h5 className="card-title">Login With Google</h5>
            <p className="card-text" style={{ color: "black" }}>
              Only your Email will be used.
              <br /> We respect your Privacy.
            </p>
            <button
              onClick={signInWithGoogle}
              className="btn btn-outline-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-google mx-1"
                viewBox=" 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
              Click Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
