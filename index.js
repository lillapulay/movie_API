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
    director: 'Robert Zemeckis',
    genre: 'Drama'
  },
  {
    title: 'Lord of the Rings',
    director: 'Peter Jackson',
    genre: 'Fantasy'
  },
  {
    title: 'Legends of the Fall',
    director: 'Edward Zwick',
    genre: 'Drama'
    }
  },
  {
    title: 'Braveheart',
    director: 'Mel Gibson',
    genre: 'Historical fiction'
  },
  {
    title: 'Gladiator',
    director: 'Ridley Scott',
    genre: 'Historical fiction'
    }
  },
  {
    title: 'Kingdom of Heaven',
    director: 'Ridley Scott',
    genre: 'Historical fiction'
    }
  },
  {
    title: 'Troy',
    director: 'Wolfgang Petersen',
    genre: 'Historical drama'
    }
  },
  {
    title: 'Fly Away Home',
    director: 'Carroll Ballard',
    genre: 'Drama'
    }
  },
  {
    title: 'Last Vegas',
    director: 'Jon Turteltaub',
    genre: 'Comedy'
  },
  {
    title: 'Some Like It Hot',
    director: 'Billy Wilder',
    genre: 'Comedy'
    }
  }
];

let genres = [
  {
    name: 'Drama',
    description: 'Within film, television and radio, drama is a genre of narrative fiction...'
  },
  {
    name: 'Fantasy',
    description: 'A fantasy story is about magic or supernatural forces...'
  },
  {
    name: 'Historical fiction',
    description: 'The genre historical fiction includes stories that are about the past...'
  },
  {
    name: 'Historical drama',
    description: 'A work set in a past time period...'
  },
  {
    name: 'Comedy',
    description: 'Comedy is a story that tells about a series of funny, or comical events...'
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
app.get('/movies/:genres/:name', (req, res) => {
  res.json(genres.find((genre) =>
    { return genre.name === req.params.name  }));
});







// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
