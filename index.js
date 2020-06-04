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

/* Returns data on ALL users
app.get('/users', function(req, res) {
  res.json(users)
});*/

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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

/* Updates the data of a user
app.put("/users/:username", (req, res) => {
    res.send("User information successfully updated");
});*/

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/* Returns data about a SINGLE user, by username - needs details!
app.get('/users/:username', (req, res) => {
  res.json(users.find((user) =>
    { return user.username === req.params.username}));
});*/

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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
