import React, { useEffect, useState } from "react";
import "../styles/signIn.css";

import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  db,
  signInWithGoogle,
  signInWithGithub,
  auth,
} from "../utils/firebase.config.js";

const SignIn = ({ user }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [displaySignIn, setDisplaySignIn] = useState(false);

  const displaySignUp = () => {
    setDisplayForm(true);
  };

  const showSignIn = () => {
    setDisplaySignIn(true);
  };

  const signInUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPassword
      );
      navigate("/");
      setDisplaySignIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  let navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    if (registerPassword === verifyPassword) {
      registerUser();
      navigate("/");
      setDisplayForm(false);
    } else alert("Passwords do not match");
  };

  const submitSignIn = () => {};

  const exitForm = () => {
    setDisplayForm(false);
    setDisplaySignIn(false);
  };

  const registerUser = async () => {
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
  };

  return (
    <div className="signIn">
      <div className="homeImageDiv">
        <img className="homeImage" src="assets/twitter.png" alt="" />
        <i
          className="fa fa-twitter"
          style={{
            fontSize: "18vw",
            position: "absolute",
            color: "white",
          }}
        ></i>
      </div>
      <div className="home--signIn">
        <i className="fa fa-twitter" style={{ fontSize: "47px" }}></i>
        <h1 style={{ fontSize: "60px" }}>Happening now</h1>
        <h1 style={{ fontSize: "36px", marginBottom: "35px" }}>
          Join Twitter today.
        </h1>
        <button onClick={signInWithGoogle} className="signIn--button">
          <img style={{ width: "20px" }} src="assets/google.png" alt="" />
          Sign up with Google
        </button>
        <button className="signIn--button">
          <i className="fa fa-github" style={{ fontSize: "20px" }}></i>
          Sign up with Github
        </button>
        <h2>
          <span>or</span>
        </h2>
        <button
          style={{ color: "white", backgroundColor: "rgb(29, 161, 242)" }}
          className="signIn--button"
          onClick={displaySignUp}
        >
          Sign up with email
        </button>
        <span style={{ width: "50%", fontSize: "10px", color: "lightgray" }}>
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </span>
        <br />
        {user?.email}
        <h3 style={{ marginTop: "35px" }}>Already have an account?</h3>
        <button
          style={{
            color: "rgb(29, 161, 242)",
            backgroundColor: "black",
            border: "1px solid gray",
          }}
          className="signIn--button"
          onClick={showSignIn}
        >
          Sign in
        </button>
        {displayForm && (
          <div className="signUpForm">
            <h1 style={{ marginTop: "0" }}>Create your account</h1>
            <input
              className="input"
              type="text"
              placeholder="Name..."
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Email..."
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="input"
              type="password"
              placeholder="Password..."
            />
            <input
              onChange={(e) => setVerifyPassword(e.target.value)}
              className="input"
              type="password"
              placeholder="Re-enter Password..."
            />
            <button onClick={submitForm} className="input">
              Submit
            </button>
            <button
              style={{ backgroundColor: "gray" }}
              onClick={exitForm}
              className="input"
            >
              Cancel
            </button>
          </div>
        )}
        {displaySignIn && (
          <div className="signUpForm">
            <h1 style={{ marginTop: "0" }}>Sign in to your account</h1>
            <input
              className="input"
              type="email"
              placeholder="Email..."
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <input
              onChange={(e) => setSignInPassword(e.target.value)}
              className="input"
              type="password"
              placeholder="Password..."
            />
            <button onClick={signInUser} className="input">
              Sign in
            </button>
            <button
              style={{ backgroundColor: "gray" }}
              onClick={exitForm}
              className="input"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
