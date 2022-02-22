import React from "react";
import { useHistory } from "react-router-dom";
const Welcome = () => {
  const history = useHistory();
  var token = localStorage.getItem("token");
  if (!token) {
    history.push("/");
  }
  const level = () => {
    history.push("/level1");
  };
  const login = () => {
    history.push("/");
    localStorage.clear();
  };
  return (
    <>
      Welcome page
      <button onClick={level}>Level 1</button>
      <button onClick={login}>Logout Me</button>
    </>
  );
};

export default Welcome;
