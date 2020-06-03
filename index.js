const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json()); // Parsing JSON
app.use(express.static('public')); // Returning documentation.html
app.use(morgan('common')); // Logging requests using Morgan

// Defining a list of movies
let movies = [
  {
    movieID: '1',
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
    genre: 'Drama'
  },
  {
    movieID: '2',
    title: 'Lord of the Rings',
    director: 'Peter Jackson',
    genre: 'Fantasy'
  },
  {
    movieID: '3',
    title: 'Legends of the Fall',
    director: 'Edward Zwick',
    genre: 'Drama'
  },
  {
    movieID: '4',
    title: 'Braveheart',
    director: 'Mel Gibson',
    genre: 'Historical fiction'
  },
  {
    movieID: '5',
    title: 'Gladiator',
    director: 'Ridley Scott',
    genre: 'Historical fiction'
  },
  {
    movieID: '6',
    title: 'Kingdom of Heaven',
    director: 'Ridley Scott',
    genre: 'Historical fiction'
  },
  {
    movieID: '7',
    title: 'Troy',
    director: 'Wolfgang Petersen',
    genre: 'Historical drama'
  },
  {
    movieID: '8',
    title: 'Fly Away Home',
    director: 'Carroll Ballard',
    genre: 'Drama'
  },
  {
    movieID: '9',
    title: 'Last Vegas',
    director: 'Jon Turteltaub',
    genre: 'Comedy'
  },
  {
    movieID: '10',
    title: 'Some Like It Hot',
    director: 'Billy Wilder',
    genre: 'Comedy'
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

let directors = [
  {
    name: 'Robert Zemeckis',
    bio: 'American director',
    birth: '1952',
    death:''
  },
  {
    name: 'Peter Jackson',
    bio: 'New Zealand film director',
    birth: '1961',
    death:''
  },
  {
    name: 'Edward Zwick',
    bio: 'American filmmaker',
    birth: '1952',
    death:''
  },
  {
    name: 'Mel Gibson',
    bio: 'American-Australian actor and filmmaker',
    birth: '1956',
    death:''
  },
  {
    name: 'Ridley Scott',
    bio: 'English filmmaker',
    birth: '1937',
    death:''
  },
  {
    name: 'Wolfgang Petersen',
    bio: 'German film director',
    birth: '1941',
    death:''
  },
  {
    name: 'Carroll Ballard',
    bio: 'American film director',
    birth: '1937',
    death:''
  },
  {
    name: 'Jon Turteltaub',
    bio: 'American film director and producer',
    birth:'1963',
    death:''
  },
  {
    name: 'Billy Wilder',
    bio: 'Austrian-born American film director',
    birth:'1906',
    death:'2002'
  },
];

let users = [
  {
    username : 'Peter Smith',
    password : 'Password123',
    email : 'petersmith@yahoo.com',
    birth : '1990-12-01',
    favorites : ["4"],
  },
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

// Returns the data about All genres, by name
app.get('/genres', function(req, res) {
  res.json(genres)
});

// Returns data about a SINGLE genre
app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genre) =>
    { return genre.name === req.params.name  }));
});

// Returns the list of ALL directors
app.get('/directors', function (req, res) {
  res.json(directors)
});

// Returns data about a SINGLE director, by name
app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) =>
    { return director.name === req.params.name }));
});

// Returns data on ALL users
app.get('/users', function(req, res) {
  res.json(users)
});

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Updates the data of a user
app.put("/users/:username", (req, res) => {
    res.send("User information successfully updated");
});

// Returns data about a SINGLE user, by username - needs details!
app.get('/users/:username', (req, res) => {
  res.json(users.find((user) =>
    { return user.username === req.params.username}));
});

// Deletes a user by username
app.delete('/users/:username', (req, res) => {
  let user = users.find((user) =>
  { return user.username === req.params.username });

  if (user) {
    users = users.filter((obj) =>
    { return obj.username !==req.params.username });
    res.status(201).send('User ' + user.username + ' was deleted.')
  }
});

// Adds a movie to a user's favorites
app.put("/users/:username/favorites/:movieID", (req, res) => {
    res.send("Movie added to favorites.");
});

// Removes a movie from a user's favorites
app.delete("/users/:username/favorites/:movieID", (req, res) => {
  res.send("Movie removed from favorites.");
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
