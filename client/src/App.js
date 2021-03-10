import React, { lazy, Suspense } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Loading from "./Shared/Loading/Loading";
import Navbar from "./Shared/Navbar/Navbar";
import { AuthContext } from "./Shared/Context/auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";
import "./App.css";

const Landing = lazy(() => import("./Main/Landing/Page/Landing"));
const GlobalUser = lazy(() => import("./Main/GlobalUsers/Page/GlobalUser"));
const SingleUser = lazy(() => import("./Main/SingleUser/Page/SingleUser"));
const Login = lazy(() => import("./Main/Authentication/Login/Login"));
const Register = lazy(() => import("./Main/Authentication/Register/Register"));
const PostDataTabs = lazy(() =>
  import("./Main/PostData/PostDataTabs/PostDataTabs")
);
const EditPlace = lazy(()=>import("./Main/EditData/EditPlace/EditPlace"))
const EditPost = lazy(()=>import("./Main/EditData/EditPost/EditPost"))
const EditUser = lazy(() => import("./Main/EditData/EditUser/EditUser"));
const SinglePost = lazy(()=>import("./Shared/SinglePost/SinglePost"))
const AboutMe = lazy(() => import("./Main/AboutMe/AboutMe"));
const GlobalZone = lazy(() => import("./Main/GlobalZone/Page/GlobalZone"));
const AdminPost = lazy(()=>import("./Main/AdminOnly/AdminPost/AdminPost"))
let hist = createBrowserHistory();
function App() {
  const { token, username, email,dp, login, logout, userId } = useAuth();
  let routes;
  if(token){
    routes = (
      <Switch>
        <Route path="/user/:userId" component={SingleUser} exact />
        <Route path="/edit/user" component={EditUser} exact />
        <Route path="/edit/place/:placeId" component={EditPlace} exact />
        <Route path="/edit/post/:postId" component={EditPost} exact />
        <Route path="/global/users" component={GlobalUser} exact />
        <Route path="/add" component={PostDataTabs} exact />
        <Route path="/post/:postId" component={SinglePost} exact />
        <Route path="/about" component={AboutMe} exact />
        <Route path="/globalzone" component={GlobalZone} exact />
        <Route path="/admin/post" component={AdminPost} exact />
        <Route path="/" component={Landing} exact />
        <Redirect to="/" />
      </Switch>
    );
  } else{
    routes = (
      <Switch>
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/" component={Landing} exact />
        <Route path="/about" component={AboutMe} exact />
        <Redirect to="/" />
      </Switch>
    );
  }
  
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          username: username,
          email: email,
          dp:dp,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router history={hist}>
          <Navbar />
          <Suspense fallback={<Loading />}>{routes}</Suspense>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
