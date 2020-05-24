const express = require('express');
const app = express();
const morgan = require('morgan');

let favMovies = [
  {
    title: 'Forrest Gump',
    director: 'Robert Zemeckis'
  },
  {
    title: 'Lord of the Rings',
    director: 'Peter Jackson'
  },
  {
    title: 'Legends of the Fall',
    director: 'Edward Zwick'
  },
  {
    title: 'Braveheart',
    director: 'Mel Gibson'
  },
  {
    title: 'Gladiator',
    director: 'Ridley Scott'
  },
  {
    title: 'Kingdom of Heaven',
    director: 'Ridley Scott'
  },
  {
    title: 'Troy',
    director: 'Wolfgang Petersen'
  },
  {
    title: 'Fly Away Home',
    director: 'Carroll Ballard'
  },
  {
    title: 'Last Vegas',
    director: 'Jon Turteltaub'
  },
  {
    title: 'Some Like It Hot',
    director: 'Billy Wilder'
  }
];

// Logging requests using Morgan
app.use(morgan('common'));

// GET route at the endpoint '/movies' - returns a JSON object with data about 10 movies (favMovies)
app.get('/movies', (req, res) => {
  res.json(favMovies);
});

// GET route at '/' returning a textual response
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Returning documentation.html
app.use(express.static('public'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
