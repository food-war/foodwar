import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';

import AWS from 'aws-sdk';
import { awsText, token_param } from '../config/awsText'; //이메일 보낼 주소등 설정해준 파일 임포트

AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json'); //자격증명 연결
AWS.config.update({ region: 'us-west-2' }); //지역 설정해주는문법 oregon

let ses = new AWS.SES();
const userModel = require('../models/userModel');
const userToken = require('../models/userToken');

// Use jsonWebToken
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
//import { BACKEND_PORT ,BACKEND_MONGODB } from '../config/env'

// Use validation
const validateRegisterInput = require('../validation/registerValidation');
const validateLoginInput = require('../validation/loginValidation');

let params = {
  Destination: {
    ToAddresses: [], // 'ghehd231@naver.com'받는 사람 이메일 주소
    CcAddresses: [], // 참조
    BccAddresses: [], // 숨은 참조
  },
  Message: {
    Body: {
      //   Text: {
      //     Data: 'test', // 본문 내용
      //     Charset: 'utf-8', // 인코딩 타입
      //   },
      Html: {
        Charset: 'UTF-8',
        Data: awsText,
      },
    },
    Subject: {
      Data: 'Foodwar 회원가입 인증', // 제목 내용
      Charset: 'utf-8', // 인코딩 타입
    },
  },
  Source: 'ghehd231@naver.com', // 보낸 사람 주소
  ReplyToAddresses: ['ghehd231@naver.com'], // 답장 받을 이메일 주소
};

module.exports = {
  test: async (req, res) => {
    res.status(200).json({ message: 'User Works!' });
  },
  /**
   * @controller  POST api/user/register/checkToken:email/:token
   * @desc        user checkToken
   * @access      Public
   */
  checkToken: async (req, res) => {
    // 1. user테이블에 insert ( = register)
    // 2. Bycript로 암호화해서 토큰 발행
    // 3. 이메일 보낼 때 입력받은 이메일이랑 토큰값 넘겨줌
    // 4. 이메일에 버튼 누르면 서버쪽에서 함수 하나 만들어서 시간을 받아옴
    // 5. 받아온 시간이랑 insert된 시간이랑 비교해서 하루 지났으면 토큰 없애줌
  },
  /**
   * @controller  POST api/user/register
   * @desc        user register
   * @access      Public
   */
  register: async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let re_params = params;
    let token_param = '바뀌냐?';
    // 입력 받은 email로 메일 보내기
    re_params.Destination.ToAddresses.push(req.body.email.trim());
    // console.log(re_params);

    ses.sendEmail(re_params, function(err, data) {
      if (err) {
        console.log(err.message);
      } else {
        //alert('이메일이 정상적으로 보내졌습니다');
        console.log('Email sent! Message ID: ', data.MessageId);
      }
    });
    userModel
      .findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          // return res.status(400).json({message: "This email already exists."});
          errors.email = 'This email already exists.';
          return res.status(400).json(errors);
        }

        /** Create new avatar */
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });
        let date1 = new Date(); //회원 테이블에는 가입 당시에 시간이 들어감

        /** Create New User */
        const newUser = new userModel({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
          date: date1,
          confirmToken: false,
        });

        /** After password encryption, sign up */
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.status(200).json(user))
              .catch(err => res.status(404).json(err));
          });
        });
      })
      .catch(err => res.status(404).json(err));

    userToken
      .findOne({ email: req.body.email })
      .then(Token => {
        if (Token) {
          errors.email = '이 이메일은 이미 토큰값을 가지고 있습니다.';
          return res.status(400).json(errors);
        }
        let date2 = new Date();
        // add a day
        date2.setDate(date2.getDate() + 1);
        let tmp_token = date2 + 'Token' + req.body.email;

        const newToken = new userToken({
          email: req.body.email,
          token: 'token1',
          EndDate: date2,
        });

        //token 암호화
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(tmp_token, salt, (err, hash) => {
            if (err) throw err;
            newToken.token = hash;

            //insert
            newToken
              .save()
              .then(Token => res.status(200).json(Token))
              .catch(err => res.status(404).json(err));
          });
        });
      })
      .catch(err => res.status(400).json(err));
  }, //END Register
  /**
     * @controller  POST api/user/login
     * @desc        user login
     * @access      Public
     */
  login: async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    /** Find users by email */
    userModel
      .findOne({ email })
      .then(user => {
        if (!user) {
          errors.email = 'Users not found';
          return res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
          //   console.log(
          //     `password : ${password} user.passwrod: ${user.password} isMatch = ${isMatch}`,
          //   );
          if (isMatch) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar };
            // Sign Token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 28800 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              });
            });
          } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        });
      })
      .catch(err => res.status(404).json(err));
  }, //END LOGIN
  current: async (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  },
};
