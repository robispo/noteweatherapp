const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/ae83ad34659b2f9368107906bf541724/${encodeURI(
    latitude
  )},${encodeURI(
    longitude
  )}?units=si&lang=en&exclude=minutely,hourly,alerts,flags`;
  const options = {
    url,
    json: true
  };

  request(options, (e, r) => {
    if (e) {
      callback('Unable to connect DarkSky!');
      return;
    } else if (r.statusCode !== 200 || r.body.error) {
      callback('Unable to find location!');
      return;
    }

    const data = r.body.currently;

    callback(
      undefined,
      `${r.body.daily.data[0].summary} It is currently ${
        data.temperature
      } degrees out. There is a ${data.precipProbability}% chance of rain.`
    );
  });
};

module.exports = forecast;
