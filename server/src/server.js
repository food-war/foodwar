const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const env = require('./config/env');

const APP_PORT = env.BACKEND_PORT;

const app = express();
app.use(morgan('combined'));
app.use(cors());

app.get('/sayHello', function(req, res) {
  res.send('Hello from the foodwar back-end!!!');
});

app.listen(APP_PORT);
console.log('Webserver listening to port', APP_PORT);