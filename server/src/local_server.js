import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

/* Routes */
import userRouter from './routes/api/userRouter';
import storeRouter from './routes/api/storeRouter';
import recomedRouter from './routes/api/recomedRouter';

import dotenv from 'dotenv';
dotenv.config();

const APP_PORT = process.env.PORT;
const app = express();

app.use(morgan('combined'));
app.use(cors());
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
app.use('/api/recomend', recomedRouter);

app.listen(APP_PORT);
console.log('Webserver listening to port', APP_PORT);
