import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Level1 = () => {
  const [level, setLevel] = useState("");
  const history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    var body = JSON.stringify({
      level,
    });
    // console.log(body);
    const res = await fetch("level1", {
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
    console.log(data.status);
    if (data.status) {
      // Id ka level +1, score ->
    } else {
      //
    }
  };
  return (
    <div>
      Level 1
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
    </div>
  );
};

export default Level1;
