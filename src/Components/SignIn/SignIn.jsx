// import React, { Component } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./SignIn.css";
import { axios } from '@/instances/axios'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { Redirect } from "react-router-dom";
// import background from '../';
SignIn.prototype = {};
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  signInSuccessUrl: "/home",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
function SignIn() {

  //Chat room
  // const [room, setRoom] = useState("");

  const [account, setAcount] = useState({
    //isAuthentication:false,
    username: "",
    password: "",
    // isRedirect : false
  });
  const [isRedirect, setIsRedirect] = useState(false);
  const changAccount = (event) => {
    setAcount({ ...account, [event.target.name]: event.target.value });
  };
  useEffect(async () => {
    const local = localStorage["userToken"];
    axios.defaults.headers.common["Authorization"] = `Bearer ${local}`;
    const verifytoken = await axios.get('/auth');
    if (verifytoken.success == true)
      setAcount({ ...account, isAuthentication: true });
  }, []);
  const LoginForm = async (event) => {
    event.preventDefault();
    const { username, password } = account;
    const loginData = await axios.post(
      "/auth/login",
      {
        username,
        password,
      }
    );
    console.log(loginData);
    if (loginData.data?.jwt) {
      // localStorage.setItem(username, loginData.data.jwt);
      localStorage.setItem("id", loginData.data.user.id);
      localStorage.setItem("token", loginData.data.jwt);
    }
    if (loginData.data?.sucess === false) {
      alert(loginData.data?.message);
    } else {
      setIsRedirect(true);
    }
    // const id = localStorage.getItem('id')
    // if (id === loginData.data.user.id) {
    //   return <Redirect to="/home"></Redirect>
    // }
  };
  
  if (isRedirect == true) return <Redirect to="/home" />;

  return (
    <div>
      {/* <div style={{ backgroundImage: "url(/img/login3.jpg)" }}> */}
      <div>
        <div className="login">
          {/* <img src="./img/logo.png" alt="" /> */}
          <form onSubmit={LoginForm}>
            <h1 style={{ textAlign: "center", marginBottom: '6%' }}>SIGN IN</h1>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter username"
                name="username"
                onChange={changAccount}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter password"
                name="password"
                onChange={changAccount}
              />
            </div>
            {/* <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember password
              </label>
            </div> */}
            <label
              className="form-check-label"
              htmlFor="exampleCheck1"
              name="error"
            ></label>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "rgba(21, 133, 141, 0.829)", marginBottom: '8%' }}
            >
              Submit
            </button>
            {/* <p style={{ textAlign: "center", paddingTop: "1%" }}>
              <a href="">Forgot your password?</a>
            </p> */}
            <p
              style={{
                textAlign: "center",
                paddingTop: "0%",
                color: "black",
                fontWeight: 600,
                paddingBottom: "0%",
              }}
            >
              Don{"'"}t have an account?{" "}
              <Link to="/sign-up"> Create new account</Link>
            </p>
          </form>
        </div>
        {/* <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        /> */}
      </div>
    </div>
  );
}

export default SignIn;
