import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import env from './config/env'

import mongoose from 'mongoose'

/* Routes */
import userRouter from './routes/api/userRouter'

const APP_PORT = env.BACKEND_PORT;

const app = express();

app.use(morgan('combined'));
app.use(cors());
/**user routes */
app.use('/api/user', userRouter);

app.get('/sayHello', function(req, res) {
  res.send('Hello from the foodwar back-end!!!');
});

app.listen(APP_PORT);
console.log('Webserver listening to port', APP_PORT);
