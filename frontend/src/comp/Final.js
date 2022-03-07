import React from "react";
import { useHistory } from "react-router-dom";

const Final = () => {
  const history = useHistory();
  const Bye = () => {
    history.push("/login");
    localStorage.clear();
  };
  return (
    <>
      Final
      <button onClick={Bye}>Bye!</button>
    </>
  );
};

export default Final;
