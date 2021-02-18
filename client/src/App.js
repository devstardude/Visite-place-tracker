import React, { lazy, Suspense } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
// import Landing from './Main/Landing/Page/Landing';

import "./App.css";
import Loading from "./Shared/Loading/Loading";
import Navbar from "./Shared/Navbar/Navbar";
import Login from "./Main/Login/Login";

const Landing = lazy(() => import("./Main/Landing/Page/Landing"));
const GlobalUser = lazy(()=>import("./Main/GlobalUsers/Page/GlobalUser"));
const SingleUser = lazy (()=>import("./Main/SingleUser/Page/SingleUser"));
let hist = createBrowserHistory();
const routes = (
  <Switch>
    <Route path="/global/users" component={GlobalUser} exact />
    <Route path="/global/users/:userId" component={SingleUser} exact />
    <Route path="/login" component={Login} exact />
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
