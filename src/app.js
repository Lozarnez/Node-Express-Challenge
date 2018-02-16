const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const config = require('../config.js');

const app = express()
const PORT = config.port
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const currentBTC = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
const prevBTC = 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD&for=yesterday';
// endpoint '/compare'
  // return amount in USD that bitcoin has risen or fallen
// two requests
  // previous days btc price
  // current days btc price
// const btc = [];
function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

app.get('/current', (req, res) => {
  Promise.all([
    get(currentBTC),
    get(prevBTC)
  ]).then(([current, prev]) => {
    // res.send({
    //   current: current.bpi.USD.rate,
    //   prev: prev.bpi
    // })
    let c = current.bpi.USD.rate_float;
    // .bpi.USD.rate;
    let p = Object.values(prev.bpi)[0];
    let diff = c - p
    res.send({c, p, diff})
    .catch(err => res.status(STATUS_USER_ERROR).send( {err: err }));
  })
})
// app.get('/current', (req, res) => {
//   fetch(currentBTC)
//     .then(current => current.json())
//     .then(current => {
//       // console.log(current);
//       // console.log(btc);
//       res.status(STATUS_SUCCESS).send(current.bpi.USD.rate);
//       btc.push(current.bpi.USD.rate);
//       console.log(btc);
//     })
//     .catch(err => {
//       res.status(STATUS_USER_ERROR).send( {err: err });
//     });
// })

// const lastBTC = [];

// app.get('/previous', (req, res) => {
//   fetch(prevBTC)
//     .then(previous => previous.json())
//     .then(previous => {
//       console.log(previous);
//       console.log(Object.values(previous.bpi));
//       res.status(STATUS_SUCCESS).send(previous.bpi);
//       // btc.push(previous);
//       // console.log(btc);
//     })
//     .catch(err => {
//       res.status(STATUS_USER_ERROR).send( {err: err });
//     });
// })





app.listen(PORT, err => {
  if (err) {
    console.log(`error starting server: ${err}`)
  } else {
    console.log(`app listening on port ${PORT}`);
  }
});
