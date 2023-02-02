const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

//몽고 db 스키마 만들기
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 70,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  //몽고 db 스키마 정보 불러오기
  var user = this;
  //salt : plain password를 salt라는 랜덤한 값을 추가해 암호 텍스트를 만듬
  //saltrounds : 10이면 10자리 salt 를 이용해 비밀번호를 암호화함
  //비밀번호를 변경할 때만 비밀번호를 암호화함
  //user_id  + secreteToken = token
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        // 비밀번호를 변경하지 않았으면 next를 실행한다
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  //plain password를 암호화해서 같은지 확인해야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.getToken = function (callback) {
  var user = this;

  //jsonwebtoken으로 token 생성하기
  //jwt.sign(payload,)
  //tohexstring : payload는 string 타입이므로 _id를 문자형으로 변환
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null,user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해 유저를 찾은 후 서버에서 가져온 토큰과 db에 보관된 토큰이 일치한지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
 