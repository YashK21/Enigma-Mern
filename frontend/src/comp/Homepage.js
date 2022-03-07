import React from "react";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();
  const handleclick = () => {
    history.push("/login");
  };
  return (
    <>
      Homepage
      <button onClick={handleclick}>to enigma</button>
    </>
  );
};

export default Homepage;
