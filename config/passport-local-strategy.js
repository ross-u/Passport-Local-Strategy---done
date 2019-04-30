const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');

// Setup for `passport.authenticate` and it's use during the authentication of the user (commonly during the login)
// done is always passed as the last parameter 
const localStrategy = new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, done) => {

    //  done() supplies the next in line passport middleware with error message or user object
    //  parameters ->  done(error, user, info)
    // `info` is an optional argument containing additional user information.

    User.findOne({ username }, (err, userObj) => {
      if (err) return done(err);
      if (!userObj) return done(null, false, { message: "Incorrect username" });

      const passwordCorrect = bcrypt.compareSync(password, userObj.password);
      if (!passwordCorrect) return done(null, false, { message: "Incorrect password" });

      return done(null, userObj);
    });
  })

  module.exports = localStrategy;