// Passport Setup - `passport` module is required and setup in here
const passport = require("passport");
const User = require('./../models/user');


// serializeUser: saves the userObj passed by `done()` from localStrategy to a session
//( this happens when user logs in successfully)
passport.serializeUser((userObj, done) => {
  done(null, userObj._id);
  // null as the first argument means NO ERRORS OCCURRED
  // done() sends the `id` to next step to be set on the cookie
});

// deserializeUser:  takes id from the cookie and queries for userObj from the database when
// (happens automatically on EVERY request once you are LOGGED-IN)
// We use it to query the session storage again and put the on `req.user`
passport.deserializeUser((idFromCookie, done) => {

  User.findById(idFromCookie)
    .then((userObj) => {    // null as the first argument means NO ERRORS OCCURRED
      done(null, userObj);  // userObj as a second argument is set to the `req.user` when calling `done()`
    })
    .catch((err) => done(err)); // err as the first argument means we tell Passport there was an error
});


module.exports = passport;