const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Set variables
const app = express();
const port = 3000;
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialViewsPath = path.join(__dirname, '../views/partials');
const name = 'Rabel Obispo';

//Set hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialViewsPath);

//Set public
app.use(express.static(publicPath));

//Set routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name,
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, perferendis. Totam culpa similique quod,' +
      'recusandae fugit exercitationem quibusdam sequi nobis asperiores numquam commodi! Nesciunt provident fuga ex' +
      'alias nisi inventore.'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 page',
    name,
    message: 'Help article not found'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    res.status(400).json({
      error: 'You must provide an address!'
    });

    return;
  }

  geocode(address, (e, { latitude, longitude, location } = {}) => {
    if (e) {
      res.status(400).json({
        error: e
      });
      return;
    }

    forecast(latitude, longitude, (er, da) => {
      if (er) {
        res.status(400).json({
          error: er
        });
        return;
      }

      const data = {
        location,
        forecast: da,
        address
      };

      res.json(data);
    });
  });
});

app.get('/product', (req, res) => {
  if (!req.query.search) {
    res.status(400).json({
      error: 'You must provide a search term!'
    });

    return;
  }

  const data = {
    products: []
  };

  res.json(data);
});

app.get('*', (req, res) => {
  console.log(req.url);

  res.render('404', {
    title: '404 page',
    name,
    message: 'Page not found'
  });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
