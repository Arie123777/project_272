/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 */

import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const RedirectToHome = () => {
  useEffect(() => {
    window.location = "/0index.html";
  }, []);

  return <></>;
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={RedirectToHome} />
      </Switch>
    </Router>
  );
};

export default App;
