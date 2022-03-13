import React from "react";
// import Welcome from "../src/comp/Welcome";
import Login from "../src/comp/Login";
import { Switch, Route, useHistory } from "react-router-dom";
import Register from "./comp/Register";
import Final from "./comp/Final";
import Homepage from "./comp/Homepage";
import Instruction from "./comp/Instruction";
import Error from "./comp/Error";
import Level from "./levels/Level";
// import "../src/comp/Error.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/instruction">
          <Instruction />
        </Route>
        <Route exact path={`/level1`}>
          <Level />
        </Route>
        <Route exact path="/error">
          <Error />
        </Route>
        <Route exact path="/final">
          <Final />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
