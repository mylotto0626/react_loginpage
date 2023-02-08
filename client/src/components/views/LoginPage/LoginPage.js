import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { loginUser } from "../../../_action/user_action";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); //새로고침 방지
    let body = {
      email: Email,
      password: Password
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        // props.history.push('/') //최신 버전에서 지원하지 않음. useNavigate() 사용
        navigate('/')
      }else{
        alert('error');
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={submitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          defaultValue={Email}
          onChange={emailHandler}
        ></input>
        
        <label>Password</label>
        <input
          type="password"
          defaultValue={Password}
          onChange={passwordHandler}
        ></input>
        <br></br>
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
