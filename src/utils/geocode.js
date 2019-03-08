const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    address
  )}.json?limit=1&access_token=pk.eyJ1Ijoicm9iaXNwbyIsImEiOiJjanN1bjJyZGwyZzllNDlwMWNxYm5mM3JyIn0.KZuM4J2FdKmrXFn5VPcLeg`;
  const options = {
    url,
    json: true
  };

  request(options, (e, r) => {
    if (e) {
      callback('Unable to connect MapBox!');
      return;
    } else if (r.statusCode !== 200 || r.body.features.length === 0) {
      callback('Unable to find location!');
      return;
    }

    const data = r.body.features[0];

    callback(undefined, {
      latitude: data.center[1],
      longitude: data.center[0],
      location: data.place_name
    });
  });
};

module.exports = geocode;
