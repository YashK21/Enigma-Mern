import React from "react";
import { useHistory } from "react-router-dom";
const Instruction = () => {
  const history = useHistory();
  var token = localStorage.getItem("token");
  if (token) {
    history.push("/instruction");
  } else {
    history.push("/error");
  }
  const level = () => {
    history.push("level1");
  };
  const logout = () => {
    history.push("/");
    localStorage.clear();
  };
  return (
    <>
      Instruction page
      <button onClick={level}>Level 1</button>
      <button onClick={logout}>Logout Me</button>
    </>
  );
};

export default Instruction;
