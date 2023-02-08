import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  //LandingPage에 들어오자마자 useEffect 시작
  useEffect(() => {
    ///api/hello server에 요청
    axios
      .get("/api/hello")
      //server에서 돌아오는 response를 화면에 보임
      .then((response) => console.log(response));
    //server와 client 주소가 다름 -> 데이터 못 받음 -> concurrently
  }, []);

  const navigate=useNavigate()
  const onclickHandler=()=>{
    axios.get('/api/users/logout')
    .then(response=>{
      if(response.data.success){
        navigate('/login')
      }else{
        alert('로그아웃 실패')
      }
    })
  }

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
      <h1>LandingPage 랜딩</h1>
      <button onClick={onclickHandler}>로그아웃</button>
    </div>
  );
}
export default LandingPage;
