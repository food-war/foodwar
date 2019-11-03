import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { BACKEND_PORT, BACKEND_MONGODB} from './config/env'
/* mongoose */
import mongoose from 'mongoose'
/* bodyParser */
import bodyParser from 'body-parser'

import passport from 'passport'
/* Routes */
import userRouter from './routes/api/userRouter'

const APP_PORT = BACKEND_PORT;

const app = express();

app.use(morgan('combined'));
app.use(cors());

/** body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/sayHello', function(req, res) {
  res.send('Hello from the foodwar back-end!!!');
});


// passport middlewears
app.use(passport.initialize()); // passport 초기화

// passport config
require('./config/passport')(passport);


/**user routes */
app.use('/api/user', userRouter);

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
