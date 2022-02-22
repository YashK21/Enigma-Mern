import React from "react";
import Welcome from "../src/comp/Welcome";
import Login from "../src/comp/Login";
import { Switch, Route } from "react-router-dom";
import Register from "./comp/Register";
import Level1 from "./levels/Level1";
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
        <Route exact path="/level1">
          <Level1 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
