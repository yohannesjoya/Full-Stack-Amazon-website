import React, { useState } from "react";
import "./LoginStyle.css";
import AmazonLogo from "../../Assets/AmazonLogo.png";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { auth } from "../Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // connectAuthEmulator,
} from "firebase/auth";
import { useGlobalState } from "../../StateProvider";
// connectAuthEmulator(auth, "https://http://localhost:3000/login");
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    console.log("-------clicked login------");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        console.log("success to login");
        //  console.log(user);

        Navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error to login");
      });
  };
  const register = (e) => {
    console.log("-------clicked create------");
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("success to sign up");
        Navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("error to sign up");
      });
  };
  return (
    <div className="login">
      <Link to="/">
        <img className="login-logo" src={AmazonLogo} alt="amazon logo here" />
      </Link>
      <div className="Login_container">
        <h1>Sign in</h1>
        <form className="Login_form">
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="Login_signIn-btn" onClick={signIn}>
            Sign in
          </button>
        </form>
        <div className="Login-details">
          <input type="checkbox" /> <span>Keep me Logged in</span>
          Choosing "Keep me signed in" reduces the number of times you're asked
          to Sign-In on this device. To keep your account secure, use this
          option only on your personal devices.
          <p>
            <a href="/">Forget Pasword?</a>
          </p>
        </div>
        <button type="" className="CreateAcc-btn" onClick={register}>
          Create Account
        </button>
      </div>
    </div>
  );
}
