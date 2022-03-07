import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../comp/register.css";
import Login from "./Login";
const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const reg = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    // console.log(error);
  };
  const submit = async (e) => {
    e.preventDefault();
    const { name, email, username, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      alert(`invalid reg`);
    } else {
      alert("successful reg");
      history.push("../");
    }
  };
  const Login = () => {
    history.push("../");
  };
  return (
    <>
      <form method="POST">
        <label>
          <p className="label-txt">ENTER YOUR NAME</p>
          <input
            type="text"
            name="name"
            className="input"
            value={user.name}
            onChange={(e) => {
              reg(e);
            }}
          />
          <div className="line-box">
            <div className="line"></div>
          </div>
        </label>
        <label>
          <p className="label-txt">ENTER YOUR EMAIL</p>
          <input
            type="text"
            name="email"
            className="input"
            value={user.email}
            onChange={(e) => {
              reg(e);
            }}
          />
          <div className="line-box">
            <div className="line"></div>
          </div>
        </label>
        <label>
          <p className="label-txt">ENTER YOUR USERNAME</p>
          <input
            type="text"
            className="input"
            name="username"
            value={user.username}
            onChange={(e) => {
              reg(e);
            }}
          />
          <div className="line-box">
            <div className="line"></div>
          </div>
        </label>
        <label>
          <p className="label-txt">ENTER YOUR PASSWORD</p>
          <input
            type="password"
            className="input"
            name="password"
            value={user.password}
            onChange={(e) => {
              reg(e);
            }}
          />
          <div className="line-box">
            <div className="line"></div>
          </div>
        </label>
        <label>
          <p className="label-txt">ENTER YOUR CONFIRM PASSWORD</p>
          <input
            type="password"
            className="input"
            name="cpassword"
            value={user.cpassword}
            onChange={(e) => {
              reg(e);
            }}
          />
          <div className="line-box">
            <div className="line"></div>
          </div>
        </label>
        <button type="submit" onClick={submit}>
          Register
        </button>
        <br />
        <br />
        <button onClick={Login}>Have An Account ? Sign In!</button>
      </form>
      <div class="back"></div>
      {/* <div class="registration-form">
        <header>
          <h1>Sign Up</h1>
          <p>Fill in all informations</p>
        </header>
        <form>
          <div class="input-section email-section">
            <input
              class="email"
              type="email"
              placeholder="ENTER YOUR E-MAIL HERE"
              autocomplete="off"
            />
            <div class="animated-button">
              <span class="icon-paper-plane">
                <i class="fa fa-envelope-o"></i>
              </span>
              <span class="next-button email">
                <i class="fa fa-arrow-up"></i>
              </span>
            </div>
          </div>
          <div class="input-section password-section folded">
            <input
              class="password"
              type="password"
              placeholder="ENTER YOUR PASSWORD HERE"
            />
            <div class="animated-button">
              <span class="icon-lock">
                <i class="fa fa-lock"></i>
              </span>
              <span class="next-button password">
                <i class="fa fa-arrow-up"></i>
              </span>
            </div>
          </div>
          <div class="input-section repeat-password-section folded">
            <input
              class="repeat-password"
              type="password"
              placeholder="REPEAT YOUR PASSWORD HERE"
            />
            <div class="animated-button">
              <span class="icon-repeat-lock">
                <i class="fa fa-lock"></i>
              </span>
              <span class="next-button repeat-password">
                <i class="fa fa-paper-plane"></i>
              </span>
            </div>
          </div>
          <div class="success">
            <p>ACCOUNT CREATED</p>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default Register;
