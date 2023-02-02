import React, { useEffect } from 'react';
import axios from 'axios';

function LoginPage(props) {
    useEffect(()=>{
        axios.get('http://localhost:5000')
    }).then(response=>{console.log(response)})

    return (
        <div>
            LoginPage
        </div>
    );
}

export default LoginPage; 