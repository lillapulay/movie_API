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
    id: '1',
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
    genre: 'Drama'
  },
  {
    id: '2',
    title: 'Lord of the Rings',
    director: 'Peter Jackson',
    genre: 'Fantasy'
  },
  {
    id: '3',
    title: 'Legends of the Fall',
    director: 'Edward Zwick',
    genre: 'Drama'
    }
  },
  {
    id: '4',
    title: 'Braveheart',
    director: 'Mel Gibson',
    genre: 'Historical fiction'
  },
  {
    id: '5',
    title: 'Gladiator',
    director: 'Ridley Scott',
    genre: 'Historical fiction'
    }
  },
  {
    id: '6',
    title: 'Kingdom of Heaven',
    director: 'Ridley Scott',
    genre: 'Historical fiction'
    }
  },
  {
    id: '7',
    title: 'Troy',
    director: 'Wolfgang Petersen',
    genre: 'Historical drama'
    }
  },
  {
    id: '8',
    title: 'Fly Away Home',
    director: 'Carroll Ballard',
    genre: 'Drama'
    }
  },
  {
    id: '9',
    title: 'Last Vegas',
    director: 'Jon Turteltaub',
    genre: 'Comedy'
  },
  {
    id: '10',
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
    birth: '1956'
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
    birth:'1963'
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
    user_id : '',
    username : 'Peter Smith',
    password : 'Password123',
    email : 'petersmith@yahoo.com',
    birth : '1990-12-01',
    favorites : {
      movie: 'Troy'
    }
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

// Registers a new user
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Updates the data of a user
app.put("/users/:username", (req, res) => {
    res.send("Successful User information updated");
});

// Returns data about a SINGLE user, by username - needs details!
app.get('/users/:username', (req, res) => {
  res.json(users.find((user) =>
    { return user.username === req.params.username}));
});

// Deletes a user by ID
app.delete('/users/:id', (req, res) => {
  let user = users.find((user) =>
  { return user.id === req.params.id });

  if (user) {
    users = users.filter((obj) =>
    { return obj.id !==req.params.id });
    res.status(201).send('User ' + user.username + 'with id: ' + req.params.id + ' was deleted.')
  }
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
