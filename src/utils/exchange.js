const request = require("request");

const exchange = (currencyFrom, currencyTo, callback) => {
  var options = {
    method: "GET",
    url: "https://currency-exchange.p.rapidapi.com/exchange",
    qs: { q: "1", from: currencyFrom, to: currencyTo },
    headers: {
      "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
      "x-rapidapi-key": "155c7c6450msh6b8db7c4c7bce49p192936jsncd690ced7b3e",
      useQueryString: true,
    },
  };

  request(options, (error, response) => {
    let data;
    if (response) {
      data = JSON.parse(response.body);
    }

    if (error) {
      callback(
        "unable to connect to the currency exchange service. please check your internet connection",
        undefined
      );
    } else if (typeof JSON.parse(response.body) == "number") {
      callback(undefined, response.body);
    } else {
      callback(
        "Oops an error occured. please contact your service provider",
        undefined
      );
    }
  });
};

module.exports = exchange;
