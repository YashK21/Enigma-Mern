import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Level = () => {
  const [ans, setAns] = useState("");
  const [levelno, setLevelNo] = useState("");
  const token = localStorage.getItem("token");
  const [l, setl] = useState(1);
  // console.log(token);
  const history = useHistory();
  if (token) {
    // history.push("/level1");
  } else {
    history.push("/error");
  }
  const submit = async (e) => {
    e.preventDefault();
    var body = JSON.stringify({
      levelno,
      ans,
    });

    // console.log(body);
    const res = await fetch(`level${l}`, {
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
      setl(l + 1);
      console.log(l);
    } else {
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
        src={require(`../img/${l}.jpg`)}
        height={500}
        width={400}
        alt="level"
      />
      ;
      <form method="POST">
        <input
          name="answer"
          placeholder="enter answer here"
          value={ans}
          onChange={(e) => setAns(e.target.value)}
        />
        <button onClick={submit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button onClick={logout}>Logout Me</button>
    </div>
  );
};

export default Level;
