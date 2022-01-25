import React from "react";
import { useHistory } from "react-router-dom";
const Welcome = () => {
  const history = useHistory();
  var token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    history.push("/");
  }
  const login = () => {
    history.push("/");
    localStorage.clear();
    console.log("first");
  };
  return (
    <>
      Welcome page
      <button onClick={login}>Logout Me</button>
    </>
  );
};

export default Welcome;
