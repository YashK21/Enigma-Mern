import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      alert("Invalid Credentials");
    } else {
      alert("Successful Login");
      localStorage.setItem("token", data.token);
      history.push("../welcome");
    }
  };
  const register = () => {
    history.push("../register");
  };
  return (
    <>
      <form method="POST">
        <div className="form-group">
          <label>username</label>
          <input
            type="name"
            name="username"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="pwd"
          />
        </div>
        {/* <div className="form-group form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> Remember me
          </label>
        </div> */}
        <button onClick={submit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button onClick={register}>CLick Me for register</button>
    </>
  );
};

export default Login;
