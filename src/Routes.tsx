import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Messaging from "./pages/Messaging";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={UserDetails} />
        <Route path="/messaging" component={Messaging} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
}

export default Routes;
