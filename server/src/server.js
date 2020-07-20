import fs from 'fs';
import https from 'https';
import path from 'path';

import '@babel/polyfill';
import express from 'express';
// import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

/* Routes */
import userRouter from './routes/api/userRouter';
import storeRouter from './routes/api/storeRouter';
import recomendRouter from './routes/api/recomedRouter';

import dotenv from 'dotenv';
dotenv.config();

const APP_PORT = process.env.PORT;
const app = express();

// app.use(morgan('combined'));
const corsOptions = {
  origin: '*', // 허락하고자 하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); // passport 초기화PO
require('./passport')(passport);

/**
 * @database    mongoose
 * @desc        Foodwar database
 * @access      Public
 */
// mongoose.Promise = global.Promise;
// mongoose
//   .connect(BACKEND_MONGODB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDb Connected..'))
//   .catch(err => console.log(err));

/** mongoose 관련 코드 시작 */
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
// mongoose.set('userFindAndModify', false);
/** mongoose 관련 코드 끝 */

/**user routes */
app.get('/sayHello', function(req, res) {
  res.send('Hello from the foodwar back-end!!!');
});
app.use('/api/user', userRouter);
app.use('/api/store', storeRouter);
app.use('/api/recomend', recomendRouter);

var certFilePath = path.resolve(__dirname, 'fullchain.pem');
var keyFilePath = path.resolve(__dirname, 'privkey.pem');
var certKeyFile = fs.readFileSync(keyFilePath);
var certFile = fs.readFileSync(certFilePath);

const credentials = {
  key: certKeyFile,
  cert: certFile,
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(APP_PORT, () => {
  console.log(`HTTPS Server running on port ${APP_PORT}`);
});
