//express 모듈 불러오기
const express = require("express");
//app : 새로운 express 앱을 만듬
//내부적으로 application이라는 객체를 생성하는데 거기에 post,get 등의 메소드가 있음
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
//요청과 함께 req.cookies 로 변환해 쿠키를 해석
const config=require('./config/key')
const { auth } = require("./middleware/auth");
const { User } = require("./models/user");

//application/json -> 요청한 데이터를 해석해 json으로 변환
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 
app.use(bodyParser.json());
app.use(cookieParser())

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    config.mongoURI  
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//클라이언트에서 HTTP 요청 메소드 중 host:port 로 요청을 보내면 실행되는 라우트
//라우터 : 네트워크 경로간 데이터를 보내기 위해 도와주는 툴
app.get("/", (req, res) => res.send("Hello World!~~ "));
app.get("/hello", (req, res) => res.send("프록시 연결"));

app.post("/register", (req, res) => {
  //회원 가입 할떄 필요한 정보들을  client에서 가져오면
  //그것들을  데이터 베이스에 넣어준다.
  const user = new User(req.body); 

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  // console.log('ping')
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    // console.log('user', user)
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      });
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err,isMatch) => {
      // console.log('err',err)
      if (!isMatch)
  
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 맞지 않습니다",
        });

      user.getToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.  어디에 ?  쿠키 
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});


//여기까지 왔다는 것은 미들웨어를 통과하였다는 뜻
//인증 완료되면 json 형태로 아래 내용을 보여줌
app.get("/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email:req.user.email
  })
})
         
// 로그아웃 하려는 유저를 db에서 찾아 토큰을 지워줌
// 로그인 하기 전의 기본 db로 돌아감 
app.post("/logout", auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
