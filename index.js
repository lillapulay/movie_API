const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

// Middleware
app.use(bodyParser.json()); // Parsing JSON
app.use(express.static('public')); // Returning documentation.html
app.use(morgan('common')); // Logging requests using Morgan

// Defining a list of movies
let movies = [
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


// Message upon hitting the root folder / home
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Returns the list of ALL movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Returns the data about a SINGLE movie, by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

// Returns data about a genre








// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
