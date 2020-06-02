// model의 schema를 만들기

const mongoose = require('mongoose');
//비밀번호를 암호화하기 위한 것
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    //trim은 space를 없애주는 역할을 함
    trim: true,
    //중복을 방지하도록
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
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
    //token을 통해서 유효성을 검새할 수 있음
  },
  //token을 사용할 수 있는 기간
  tokenExp: {
    type: Number,
  },
});

//user에서 정보를 저장하기 전에 이 것을 꼭 수행하도록 한다
//비밀번호를 바꿀 때만 암호화를 하도록 한다
userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    //비밀번호를 암호화 시킴
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        //위의 함수를 모두 실행하고나서 index.js의 save로 이동해서 수행함
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainpassword를 암호화해서 암호화된 비밀번호와 비교해야 한다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  //jsonwebtoken을 이용해서   token을 생성하기
  var user = this;
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //토큰을 decode 한다.
  jwt.verify(token, 'secretToken', function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰에 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
//모델로 스키마를 한번 감싸줘야 한다
const User = mongoose.model('User', userSchema);

//다른 곳에서도 쓸 수 있게 module화를 한다
module.exports = { User };
