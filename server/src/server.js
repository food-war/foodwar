import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { BACKEND_PORT, BACKEND_MONGODB} from './config/env'

import mongoose from 'mongoose'

/* Routes */
import userRouter from './routes/api/userRouter'

const APP_PORT = BACKEND_PORT;

const app = express();

app.use(morgan('combined'));
app.use(cors());
/**user routes */
app.use('/api/user', userRouter);

app.get('/sayHello', function(req, res) {
  res.send('Hello from the foodwar back-end!!!');
});

/**
 * @database    mongoose
 * @desc        Foodwar database
 * @access      Public
 */
mongoose.Promise = global.Promise;
mongoose.connect(BACKEND_MONGODB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDb Connected..'))
    .catch(err => console.log(err));

app.listen(APP_PORT);
console.log('Webserver listening to port', APP_PORT);
