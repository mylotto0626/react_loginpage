import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { registerUser } from "../../../_action/user_action";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const NameHandler=(event)=>{
    setName(event.target.value);
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const ConfirmPasswordHandler=(event)=>{
    setConfirmPassword(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    console.log('email',Email)
    console.log('name',Name)
    console.log('password',Password)
    console.log('confirm',confirmPassword)

    if(Password!==confirmPassword){
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다')
    }
    //새로고침 방지
    let body = {
      email: Email,
      name:Name,
      password: Password,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        // props.history.push('/') //최신 버전에서 지원하지 않음. useNavigate() 사용
        navigate("/login");
      } else {
        alert("fail to sign up");
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
        <label>Name</label>
        <input
          type="text"
          defaultValue={Name}
          onChange={NameHandler}
        ></input>
        <label>Password</label>
        <input
          type="password"
          defaultValue={Password}
          onChange={passwordHandler}
        ></input>
        <label>Confirm Password</label>
        <input
          type="password"
          defaultValue={confirmPassword}
          onChange={ConfirmPasswordHandler}
        ></input>
        
        <br></br>
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
