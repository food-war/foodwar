const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
// import User from '../models/userModel'
import dotenv from 'dotenv';
dotenv.config();

// 아래는 passport 홈피에 있는 코드임 (그냥 작성해놓고 이 모듈을 가져다가 쓰면 됨)

/**
 * 1. 로그인
 * 2. JWT 발급
 * 3. 장바구니 화면을볼 때 토큰이 있는지, 정상인지 등 검사하는 게 PASSPORT
 */
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // 헤더에있는 토큰을 opts에 넣어줌.
opts.secretOrKey = process.env.SECRET_OR_KEY;

// 검증하는 코드
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user); // 성공
          }
          return done(null, false); // 실패
        })
        .catch((err) => console.log(err));
    }),
  );
};
