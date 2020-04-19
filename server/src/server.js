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

import dotenv from 'dotenv';
dotenv.config();

const APP_PORT = process.env.PORT;
const app = express();

// app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); // passport 초기화PO
require('./passport')(passport);

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to mongod server');
});

mongoose.connect('mongodb://mongo/foodwar');

/**user routes */
app.get('/sayHello', function (req, res) {
  res.send('Hello from the foodwar back-end!!!');
});
app.use('/api/user', userRouter);
app.use('/api/store', storeRouter);

app.listen(APP_PORT);
console.log('Webserver listening to port', APP_PORT);
