import React, { lazy, Suspense } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
// import Landing from './Main/Landing/Page/Landing';

import "./App.css";
import Loading from "./Shared/Loading/Loading";

const Landing = lazy(() => import("./Main/Landing/Page/Landing"));
const GlobalUser = lazy(()=>import("./Main/GlobalUsers/Page/GlobalUser"));
let hist = createBrowserHistory();
const routes = (
  <Switch>
    <Route path="/global/users" component={GlobalUser} exact />
    <Route path="/loading" component={Loading} exact />
    <Route path="/" component={Landing} exact />
    <Redirect to="/" />
  </Switch>
);

function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Suspense fallback={<Loading />}>{routes}</Suspense>
      </Router>
    </div>
  );
}

export default App;
