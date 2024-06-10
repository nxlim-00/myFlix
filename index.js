const express = require('express'),
  morgan = require('morgan');

const app = express();

let topMovies = [
  {
    title: 'Star Wars: Episode IV - A New Hope',
    cast: 'Mark Hamill, Harrison Ford',
    director: 'George Lucas',
    realeased: '25.05.1977',
  },
  {
    title: 'The Godfather',
    cast: 'Marlon Brando, Al Pacino',
    director: 'Francis Ford Coppola',
    realeased: '24.03.1972',
  },
  {
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
  },
  {
    title: "Schindler's List",
    cast: 'Liam Neeson, Ben Kingsley',
    director: 'Steven Spielberg',
    realeased: '15.12.1993',
  },
];

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

/* app.get('/documentation.html', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
}); */

app.use('/documentation', express.static('public/documentation.html'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
