/**
 * @file This module contains the functionality for handling JWT-based authentication and login.
 */

const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // Your local passport file

/**
 * Generates a JWT (JSON Web Token) for a user.
 *
 * @param {object} user - The user object to generate a token for.
 * @returns {string} - The signed JWT token.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256', // This is the algorithm used to “sign” or encode the values of the JWT
  });
};

/**
 * This module exports a function that sets up the POST /login route for user authentication.
 * @module auth
 * @param {object} router - The Express router object.
 */
module.exports = (router) => {
  /**
   * POST /login
   *
   * Authenticates a user and generates a JWT token upon successful login.
   *
   * @name auth/login
   * @function
   * @memberof module:auth
   * @inner
   * @param {object} req - The HTTP request object.
   * @param {object} res - The HTTP response object.
   */
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
