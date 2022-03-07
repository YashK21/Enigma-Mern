import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Level1 = () => {
  const [level, setLevel] = useState("");
  const token = localStorage.getItem("token");
  // console.log(token);
  const history = useHistory();
  if (token) {
    history.push("/level1");
  } else {
    history.push("/error");
  }
  const submit = async (e) => {
    e.preventDefault();
    var body = JSON.stringify({
      level,
    });
    // console.log(body);
    const res = await fetch(`level1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await res.json();
    // console.log("Step1");
    console.log(data);
    console.log(res.status);
    if (res.status === 200 || !data) {
      history.push("/final");
    } else {
      // Id ka level +1, score ->
      alert("wrong");
    }
  };
  const logout = () => {
    history.push("/");
    localStorage.clear();
  };
  return (
    <div>
      level1
      <img
        src={require("../img/level1.jpg")}
        height={500}
        width={400}
        alt="level1"
      />
      <form method="POST">
        <input
          name="level"
          placeholder="enter answer here"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <button onClick={submit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button onClick={logout}>Logout Me</button>
    </div>
  );
};

export default Level1;
