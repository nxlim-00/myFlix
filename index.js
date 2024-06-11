const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  path = require('path');

let movies = [
  {
    Genre: { name: 'Sci-Fi' },
    Director: {
      name: 'George Lucas',
      born: '1944-05-14',
      deathyear: 'N/A',
      bio: 'George Lucas is an American film director, producer, and screenwriter, best known for creating the Star Wars and Indiana Jones franchises. He is the founder of Lucasfilm and Industrial Light [&] Magic.',
    },
    _id: '665193d02ccaed80dfcdce02',
    Title: 'Star Wars - Revenge of the Sith',
    Description:
      'Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.',
    ReleaseDate: '2005-05-19',
    ImageUrl:
      'https://upload.wikimedia.org/wikipedia/en/9/94/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg',
    Rating: 7.5,
    Featured: true,
  },
  {
    Genre: { name: 'Drama' },
    Director: {
      name: 'Francis Ford Coppola',
      born: '1939-04-07',
      deathyear: 'N/A',
      bio: 'Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood movement, known for directing the critically acclaimed The Godfather trilogy and Apocalypse Now. Coppola has won multiple Academy Awards and is renowned for his impact on the history of cinema.',
    },
    _id: '665193d02ccaed80dfcdce03',
    Title: 'The Godfather',
    Description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    ReleaseDate: '1972-03-24',
    ImageUrl:
      'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
    Rating: 9.2,
    Featured: true,
  },
  /*   {
    title: 'Titanic',
    cast: 'Leonardo DiCaprio, Kate Winslet',
    director: 'James Cameron',
    realeased: '19.12.1997',
  },
  {
    title: 'Inception',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
    director: 'Christopher Nolan',
    realeased: '16.07.2010',
  },

  {
    title: 'Pulp Fiction',
    cast: 'John Travolta, Samuel L. Jackson',
    director: 'Quentin Tarantino',
    realeased: '14.10.1994',
  },
  {
    title: 'The Dark Knight',
    cast: 'Christian Bale, Heath Ledger',
    director: 'Christopher Nolan',
    realeased: '18.07.2008',
  },
  {
    title: 'Forrest Gump',
    cast: 'Tom Hanks, Robin Wright',
    director: 'Robert Zemeckis',
    realeased: '6.07.1994',
  },

  {
    title: 'The Lord of the Rings: The Fellowship of the Ring ',
    cast: 'Elijah Wood, Ian McKellen',
    director: 'Peter Jackson',
    realeased: '19.12.2001',
  },

  {
    title: 'The Matrix',
    cast: 'Keanu Reeves, Laurence Fishburne',
    director: 'The Wachowskis',
    realeased: '31.03.1999',
  }, */
  {
    Genre: { name: 'Drama' },
    Director: {
      name: 'Steven Spielberg',
      born: '1946-12-18',
      deathyear: 'N/A',
      bio: "Steven Spielberg is an American film director, producer, and screenwriter. He is one of the most influential filmmakers in the history of cinema, known for directing blockbuster films like Jaws, E.T. the Extra-Terrestrial, and Jurassic Park, as well as critically acclaimed dramas such as Schindler's List and Saving Private Ryan. Spielberg's films have grossed over $10 billion worldwide, making him the highest-grossing director of all time. He has won numerous awards, including three Academy Awards and a multitude of Golden Globes and BAFTAs.",
    },
    _id: '665193d02ccaed80dfcdce04',
    Title: "Schindler's List",
    Description:
      'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    ReleaseDate: '1993-12-15',
    ImageUrl:
      'https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg',
    Rating: 9.0,
    Featured: true,
  },
];

/* let user = [
  {
    id: 1,
    name: 'Leo Khan',
    email: 'leo.khan@example.com',
    favoriteMovie: ['The Godfather'],
  },
  {
    id: 2,
    name: 'Joe Goldsand',
    email: 'joe.goldsand@example.com',
    favoriteMovie: ['Star Wars - Revenge of the Sith'],
  },
  {
    id: 3,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    favoriteMovie: ['The Matrix'],
  },
  {
    id: 4,
    name: 'John Smith',
    email: 'john.smith@example.com',
    favoriteMovie: ['Inception'],
  },
]; */

app.use(morgan('common'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the documentation.html file at the '/documentation.html' route
app.get('/documentation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

/* READ
app.get('/movies', (res, req) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send('Movie not found.');
  }
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
}); */
