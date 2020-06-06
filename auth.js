const jwtSecret = 'your_jwt_secret'; // Has to be the same key as the one used in JWTStrategy
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport'); // Local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username we're encoding in the JWT
    expiresIn: '7d', // Token expires in 7 days
    algorithm: 'HS256' // Algorithm used to "sign" or encode the values of the JWT
  });
}

// POST login
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json ({ user, token });
      });
    })(req, res);
  });
}
