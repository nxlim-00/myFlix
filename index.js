const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  path = require('path'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const Movies = Models.Movie,
  Users = Models.User,
  Genres = Models.Genre,
  Directors = Models.Director;

mongoose.connect('mongodb://127.0.0.1:27017/cfDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// middleware
app.use(morgan('common'));
app.use(bodyParser.json());

// serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// serve the documentation.html file at the '/documentation.html' route
app.get('/documentation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

// default text when "/"
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// 1. Return a list of ALL Movies to the user
app.get('/movies', (req, res) => {
  Movies.find()
    .then((Movies) => {
      res.status(201).json(Movies);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error: ' + err);
    });
});

// 2. Return data about a single Movie by title to the user
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((Movie) => {
      res.json(Movie);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error: ' + err);
    });
});

// 3. Return data about a genre by name/title
app.get('/movies/genre/:genreName', (req, res) => {
  Genres.findOne({ Name: req.params.genreName })
    .then((genre) => {
      res.json(genre.Description);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error: ' + err);
    });
});

// 4. Return data about a director by name
app.get('/movies/director/:directorName', (req, res) => {
  Directors.findOne({ Name: req.params.directorName })
    .then((director) => {
      if (!director) {
        return res.status(404).send('Director not found');
      }
      res.json(director.Bio);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET all users
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

// GET user by username
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// 5. Allow new users to register
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists.');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error: ' + error);
    });
});

// 6. Allow users to update their user info (username, password, email, date of birth)
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true } // This line makes sure that the updated document is returned
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// 7. Allow users to add a Movie to their list of favorites
app.post('/users/:Username/Movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true } // This line makes sure that the updated document is returned
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// 8. Allow users to remove a Movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndRemove(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID },
    },
    { new: true } // This line makes sure that the updated document is returned
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// 9. Allow existing users to deregister by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// encode the url
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// error-handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen to requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
