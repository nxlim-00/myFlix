MyFlix API
Welcome to the MyFlix API! This is a RESTful web API for accessing a database of movies, genres, directors, and user information. This API is built using Express and MongoDB and provides a variety of endpoints for managing user accounts and movie data.

Table of Contents
Getting Started
Prerequisites
Installation
Running the API
Endpoints
Movies
Users
Error Handling
Authentication
Hosting
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js
MongoDB Atlas account or a local MongoDB instance
Heroku account for hosting (optional)
Installation
Clone the repository:

sh
Code kopieren
git clone https://github.com/your-username/myflix-api.git
cd myflix-api
Install dependencies:

sh
Code kopieren
npm install
Create a .env file in the root directory and add your MongoDB connection string:

sh
Code kopieren
CONNECTION_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFlixDB?retryWrites=true&w=majority
Optionally, add a port to your .env file:

sh
Code kopieren
PORT=8080
Running the API
Start the server with the following command:

sh
Code kopieren
node index.js
By default, the server will run on http://localhost:8080.

Endpoints
The API is hosted on Heroku at: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/

Movies
GET /movies

Returns a list of all movies.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/movies
GET /movies/

Returns data about a single movie by title.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/movies/Inception
GET /movies/genre/

Returns data about a genre by name.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/movies/genre/Action
GET /movies/director/

Returns data about a director by name.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/movies/director/ChristopherNolan
Users
GET /users

Returns a list of all users.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users
GET /users/

Returns data about a user by username.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/johndoe
POST /users

Allows new users to register.
Request body parameters: Username, Password, Email, Birthday.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users
PUT /users/

Allows users to update their information.
Authentication required.
Request body parameters: Username, Password, Email, Birthday.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/johndoe
POST /users/
/Movies/

Allows users to add a movie to their list of favorites.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/johndoe/Movies/60c72b2f4f1a4b3a4c8f2b2e
DELETE /users/
/movies/

Allows users to remove a movie from their list of favorites.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/johndoe/movies/60c72b2f4f1a4b3a4c8f2b2e
DELETE /users/

Allows existing users to deregister.
Authentication required.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/users/johndoe
Error Handling
Errors are handled by a centralized middleware function that captures errors and sends a JSON response with an appropriate status code and message.

Authentication
This API uses JWT (JSON Web Token) for authentication. To access protected routes, you need to include a valid JWT token in the Authorization header of your requests.

Login
To log in and receive a JWT token, use the following endpoint:

POST /login
Request body parameters: Username, Password.
Example: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/login
Hosting
The MyFlix API is hosted on Heroku. You can access it at: https://myflixx-movie-app-2d5cece4bfb1.herokuapp.com/

For more details, refer to the official Heroku documentation: Deploying Node.js Apps on Heroku.
