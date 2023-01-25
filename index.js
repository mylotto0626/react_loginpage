const express = require("express"); //express 불러오기
const app = express(); // express 사용
const port = 3000;
const bodyParser = require("body-parser");
const config = require('./config/key');
//스키마 가져오기
const { User } = require("./models/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose"); //mongoose 불러오기
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("연결 완료"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("연결성공"));
app.post("/register", (req, res) => {
  //필요한 정보들을 client에서 가져오면
  // 데이터 베이스에 넣음
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.listen(port, () => console.log(`listening on ${port}`));
