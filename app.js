'use strict';

const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  
  const { sort = '', genre = '' } = req.query;

  let results = playstore;

  if(sort) {
    if(!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Sort must be either Rating or App');
    } 

    results.sort((a, b) => {
      return a[sort] > a[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });

    if(sort === 'Rating') {
      results.reverse();
    }
  }


  if(genre) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
      .includes(genre)) {
      return res.status(400).send('Invalid genre');
    }

    results = results.filter(app => {
      return app.Genres.includes(genre);
    });
  }

  res.json(results);

});

// app.listen(8000, () => {
//   console.log('Listening on PORT 8000');
// });

module.exports = app;