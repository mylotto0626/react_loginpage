const {User} = require('../models/user')

let auth=(res,req,next)=>{
    let token=req.cookies.x_auth;

    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false,error:true})

        req.token=token;
        req.user=user;
        next();
    })
}
module.exports={auth};    

//페이지 이동시 로그인 했는지 확인 처리 하는 곳
//쿠키에서 토큰을 가져온다
//토큰을 decode한후 유저를 찾는다
//유저가 있으면 로그인한 상태 