const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const currentBTC = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';
const prevBTC = 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD&for=yesterday';

function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

const answer = async (req, res) => {
  try {
    const current = await get(currentBTC);
    const prev = await get(prevBTC);
    const currentDayPrice = current.bpi.USD.rate_float;
    const previousDayPrice = Object.values(prev.bpi)[0];
    const priceDifference = currentDayPrice - previousDayPrice;
    res.send({
      priceDifference,
      currentDayPrice,
      previousDayPrice
    })
  } catch (err) {
    res.status(STATUS_USER_ERROR).send({ error: err });
  }
}

module.exports = {
  answer,
}