import React from "react";
import Welcome from "../src/comp/Welcome";
import Login from "../src/comp/Login";
import { Switch, Route } from "react-router-dom";
import Register from "./comp/Register";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
