import React, { lazy, Suspense } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./App.css";
import Loading from "./Shared/Loading/Loading";
import Navbar from "./Shared/Navbar/Navbar";

const Landing = lazy(() => import("./Main/Landing/Page/Landing"));
const GlobalUser = lazy(()=>import("./Main/GlobalUsers/Page/GlobalUser"));
const SingleUser = lazy (()=>import("./Main/SingleUser/Page/SingleUser"));
const Login = lazy(() => import("./Main/Authentication/Login/Login"));
const AddUser = lazy(()=>import("./Main/Authentication/AddUser/AddUser"))
const PostDataTabs = lazy(()=>import("./Main/PostData/PostDataTabs/PostDataTabs"))
let hist = createBrowserHistory();
const routes = (
  <Switch>
    <Route path="/global/users" component={GlobalUser} exact />
    <Route path="/global/users/:userId" component={SingleUser} exact />
    <Route path="/login/adduser" component={AddUser} exact />
    <Route path="/login" component={Login} exact />
    <Route path="/add" component={PostDataTabs} exact />
    <Route path="/" component={Landing} exact />
    <Redirect to="/" />
  </Switch>
);

function App() {
  return (
    <div className="App">
      <Router history={hist}>
      <Navbar/>
        <Suspense fallback={<Loading />}>{routes}</Suspense>
      </Router>
    </div>
  );
}

export default App;
