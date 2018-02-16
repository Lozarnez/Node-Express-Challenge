const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const config = require('../config.js');

const app = express()
const PORT = config.port
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

app.listen(PORT, err => {
  if (err) {
    console.log(`error starting server: ${err}`)
  } else {
    console.log(`app listening on port ${PORT}`);
  }
});
