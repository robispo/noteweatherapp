const getForecast = (address, callback) => {
  let url = `/weather?address=${encodeURI(address)}`;

  fetch(url)
    .then(r =>
      r
        .json()
        .then(d => callback(undefined, d))
        .catch(callback)
    )
    .catch(callback);
};
const weatherForm = document.getElementById('mainform');
const addressInp = document.getElementById('inpaddress');

const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  message1.textContent = 'Loadingo...';
  message2.textContent = '';

  getForecast(addressInp.value, (e, d) => {
    if (e || d.error) {
      message1.textContent = e || d.error;
      return;
    }

    message1.textContent = d.location;
    message2.textContent = d.forecast;
  });
});

//   function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         consoleLog('Geolocation is not supported by this browser.');
//     }
//   }

//   function showPosition(position) {
//     consoleLog(position);
//     // x.innerHTML = "Latitude: " + position.coords.latitude +
//     // "<br>Longitude: " + position.coords.longitude;
//   }
//   getLocation();
