import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <div className="App">
        {/* <h1>hello</h1> */}
        <Routes>
          {/* Route는 경로가 부분적으로 일치하는 컴포넌트도 렌더링하는 특성을 가지고 있기 때문이다.
  //   의도치 않은 렌더링을 위해 exact를 사용한다. */}
          <Route path="/" element={ <AuthLandingPage /> } />
          <Route path="/login" element={ <AuthLoginPage /> }/>
          <Route path="/register" element={ <AuthRegisterPage /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
