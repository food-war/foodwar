import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import AWS from 'aws-sdk';

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
const validateTokenInput = require('../validation/tokenValidation');

let awsText = '';
const params = {
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
    // 1. 토큰 유효성 검사
    //   -> 토큰테이블에 있는 토큰, 이메일 이랑 입력받은 토큰, 이메일이 있는지
    //   -> 토큰테이블에서 token - bcript compare 해서 같은지 체크
    // 2. token 만료 시간이랑 현재 시간 비교해서 만료시간보다 크면 안되게끔
    console.log(
      `서버단 연결 성공 토큰: ${req.body.token}  이메일 : ${req.body.email} and time : ${new Date()}`,
    );
    const { errors, isValid } = validateTokenInput(req.body);
    userToken
      .findOne({ token: req.body.token, email: req.body.email })
      .then(token => {
        console.log(`req.body.token : ${req.body.token} token.token : ${token.token}`);
        bcrypt.compare(req.body.token, token.token).then(isMatch => {
          console.log(`isMatch---> ${isMatch}`);
          if (isMatch) {
            console.log(`비크립트 비교 성공`);
            // const payload = { id: user.id, name: user.name, avatar: user.avatar };
            // Sign Token
          } else {
            console.log(errors);
            return res.status(400).json(errors);
          }
        });
      })
      .catch(err => res.status(404).json(err));
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

    const re_params = params;

    // 입력 받은 email로 메일 보내기
    re_params.Destination.ToAddresses.push(req.body.email.trim());
    // console.log(re_params);
    let ses_token = '';
    userModel
      .findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          // return res.status(400).json({message: "This email already exists."});
          errors.email = 'This email already exists.';
          return res.status(400).json(errors);
        } else {
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
        }
      })
      .catch(err => res.status(404).json(err));

    userToken
      .findOne({ email: req.body.email })
      .then(Token => {
        if (Token) {
          errors.email = '이 이메일은 이미 토큰값을 가지고 있습니다.';
          return res.status(400).json(errors.email);
        } else {
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
              ses_token = hash;
              //insert
              newToken
                .save()
                .then(Token => res.status(200).json(Token))
                .catch(err => res.status(404).json(err));

              // email 템플릿에 토큰 값 전달
              let awsText = `
              <html>
                <div style="width: 100%; text-align: center; font-size: 15px; color: #2e736f;">
                  <div><h1>Foodwar 회원가입 인증</h1></div>
                  <div style="margin-top: 20px;"> 인증번호 : <span style="color: #000;">${ses_token}</span></div>
                  <div> 인증번호를 복사 후 푸드워 회원가입 인증을 완료 해주시기 바랍니다.</div>
                </div>
              </html>`;

              re_params.Message.Body.Html.Data = awsText;

              // ses email 보내기
              ses.sendEmail(re_params, function(err, data) {
                if (err) {
                  console.log(err.message);
                } else {
                  //alert('이메일이 정상적으로 보내졌습니다');
                  console.log('Email sent! Message ID: ', data.MessageId);
                }
              });
            });
          });
        }
      })
      // .catch(err => res.status(400).json(err));
      .catch(err => res.status(404).json(err));
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
