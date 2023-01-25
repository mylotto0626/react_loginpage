const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  id: {
    type: String,
    maxLength: 10,
  },
  password: {
    type: String,
    maxLength: 16,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  //비밀번호를 암호화 시킴
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword=function(password,callback){
    //plain password를 암호화해서 같은지 확인해야함
    bcrypt.compare(password, this.password,function(err,isMatch){
        if(err) return callback(err),
        callback(null,isMatch)
    })
}

userSchema.methods.getToken=function(callback){
    //jsonwebtoken으로 token 생성하기
    
}

const User = mongoose.model("user", userSchema);

module.exports = { User };
