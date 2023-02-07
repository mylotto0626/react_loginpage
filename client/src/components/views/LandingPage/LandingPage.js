import React, {useEffect}from 'react';
import axios from 'axios';
function LandingPage() {
    //LandingPage에 들어오자마자 useEffect 시작
    useEffect(()=>{
        ///api/hello server에 요청
        axios.get('http://localhost:5000/hello')
        //server에서 돌아오는 response를 화면에 보임
        .then(response => console.log(response))
        //server와 client 주소가 다름 -> 데이터 못 받음 -> concurrently
    },[])
return (
    <div>
        LandingPage 랜딩
    </div>
)
}
export default LandingPage;