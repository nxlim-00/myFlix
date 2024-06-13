const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  path = require('path'),
  uuid = require('uuid');

let movies = [
  {
    Title: 'Star Wars - Revenge of the Sith',
    Description:
      'Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.',
    ReleaseDate: '2005-05-19',
    ImageUrl:
      'https://upload.wikimedia.org/wikipedia/en/9/94/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg',
    Rating: 7.5,
    Featured: true,
    Genre: { name: 'Sci-Fi' },
    Director: {
      Name: 'George Lucas',
      Born: '1944-05-14',
      Death: 'N/A',
      Bio: 'George Lucas is an American film director, producer, and screenwriter, best known for creating the Star Wars and Indiana Jones franchises. He is the founder of Lucasfilm and Industrial Light [&] Magic.',
    },
  },
  {
    Title: 'The Godfather',
    Description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    ReleaseDate: '1972-03-24',
    ImageUrl:
      'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
    Rating: 9.2,
    Featured: true,
    Genre: { name: 'Drama' },
    Director: {
      Name: 'Francis Ford Coppola',
      Born: '1939-04-07',
      Death: 'N/A',
      Bio: 'Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood movement, known for directing the critically acclaimed The Godfather trilogy and Apocalypse Now. Coppola has won multiple Academy Awards and is renowned for his impact on the history of cinema.',
    },
  },
  {
    Title: "Schindler's List",
    Description:
      'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    ReleaseDate: '1993-12-15',
    ImageUrl:
      'https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg',
    Rating: 9.0,
    Featured: true,
    Genre: { name: 'Drama' },
    Director: {
      Name: 'Steven Spielberg',
      Born: '1946-12-18',
      Death: 'N/A',
      Bio: "Steven Spielberg is an American film director, producer, and screenwriter. He is one of the most influential filmmakers in the history of cinema, known for directing blockbuster films like Jaws, E.T. the Extra-Terrestrial, and Jurassic Park, as well as critically acclaimed dramas such as Schindler's List and Saving Private Ryan. Spielberg's films have grossed over $10 billion worldwide, making him the highest-grossing director of all time. He has won numerous awards, including three Academy Awards and a multitude of Golden Globes and BAFTAs.",
    },
  },
];
let users = [
  {
    id: 1,
    name: 'Leo',
    email: 'leo.khan@example.com',
    favoriteMovies: [],
  },
  {
    id: 2,
    name: 'Joe',
    email: 'joe.goldsand@example.com',
    favoriteMovies: ['Star Wars - Revenge of the Sith'],
  },
  {
    id: 3,
    name: 'Jane',
    email: 'jane.doe@example.com',
    favoriteMovies: [],
  },
  {
    id: 4,
    name: 'John',
    email: 'john.smith@example.com',
    favoriteMovies: ['Inception'],
  },
];

// middleware
app.use(morgan('common'));
app.use(bodyParser.json());

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// serve the documentation.html file at the '/documentation.html' route
app.get('/documentation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

// READ movie list
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

// READ single movie
app.get('/movies/:movie', (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('Movie not found.');
  }
});

// READ single genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Genre not found.');
  }
});

// READ single director
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('Director not found.');
  }
});

// READ user list
app.get('/users', (req, res) => {
  res.status(200).json(user);
});

// CREATE new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('User need a name.');
  }
});

// UPDATE user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('User not found.');
  }
});

// CREATE user's fav movie list
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to ${id}'s list.`);
  } else {
    res.status(400).send('List not found.');
  }
});

// DELETE movie from user's fav list
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res.status(200).send(`${movieTitle} has been removed from ${id}'s list.`);
  } else {
    res.status(400).send('List not found.');
  }
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('User not found.');
  }
});

// encode the url
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// error-handeling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen to requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
