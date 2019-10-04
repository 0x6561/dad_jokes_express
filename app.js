var createError = require('http-errors');
var express = require('express');
var helmet = require('helmet')
const { check, body, sanitizeBody, validationResult } = require('express-validator');
const rateLimit = require("express-rate-limit");

var db = require('./Joke_db').initDB();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
 
// only apply to requests that begin with /api/
app.use("/api/", apiLimiter);

/* GET index. */
app.get('/', function( req, res, next) {
  res.send('boo!')
}
);

/* GET joke. */
app.get('/get_joke', function( req, res, next) {
  console.log(req.body);
  //const sql = 'SELECT * FROM DAD_JOKES WHERE ID IN (SELECT ID FROM DAD_JOKES ORDER BY RANDOM() LIMIT 1)';
  let sql = 'SELECT * FROM DAD_JOKES';
  var params = [req.params.id]
  let db = require('./Joke_db').initDB();
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data":row
    })
  });
  //res.render('index', { title: 'Express' });
});

/* POST joke. */
app.post("/api/add_joke",
  [check('name').trim().escape(),
  check('jokeSetup').escape(),
  check('jokePunchline').escape()],
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

  //console.log(req.body);
  //const sql = 'SELECT * FROM DAD_JOKES WHERE ID IN (SELECT ID FROM DAD_JOKES ORDER BY RANDOM() LIMIT 1)';
  let sql = 'INSERT INTO DAD_JOKES (SUBMITER, SETUP, PUNCHLINE, ENABLED, DATE, VIEWS, RATING ) VALUES (?, ?, ?, ?, ?, ?, ?)';
  var date = new Date();
  // let setup = req.params.setup;
  let name = req.body.name;
  let setup = req.body.jokeSetup;
  //let punchline = req.params.punchline;
  let punchline = req.body.jokePunchline;
  let params = [name, setup, punchline, 'false', date, 0, 0];
  console.log(params);

  let db = require('./Joke_db').initDB();
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data": req.body
    })
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

