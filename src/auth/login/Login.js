import React, { useState,useEffect,useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const LOGIN_API = "https://reqres.in/api/login"

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  
  
  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setErrMsg('');
}, [email,pass])




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(LOGIN_API,{
            email:email,
            password:pass
        })
        setEmail('');
        setPass('');
        navigate('/home')
    } catch (error) {
        console.log(error)
        if (!error?.response) {
            setErrMsg('No Server Response !');
        } else if (error.response?.status === 400) {
            setErrMsg('Missing Username or Password !');
        } else if (error.response?.status === 401) {
            setErrMsg('Unauthorized !');
        } else {
            setErrMsg('Login Failed !');
        }
        errRef.current.focus();
    }
  };

  return (
    <div className="auth-form-container">
      <p
        ref={errRef}
        className={errMsg? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h2 className="h2-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="label-auth" htmlFor="user">
          Email
        </label>
        <input
          className="input-auth"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Username"
          id="email"
          name="email"
          ref={userRef}
        />
        <label className="label-auth" htmlFor="password">
          Password
        </label>
        <input
          className="input-auth"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="button-auth" type="submit">
          Log In
        </button>
      </form>
      <Link to="/register">
        <button className="link-btn">
          Don't have an account? Register here.
        </button>
      </Link>
    </div>
  );
};

export default Login;
