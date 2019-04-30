var express = require('express');
var router = express.Router();
var authRouter = require('./auth-routes');

// *  '/'
router.use('/', authRouter);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Passport.js' });
});

module.exports = router;
