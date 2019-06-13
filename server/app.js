var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

var router = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(cors({credentials: true, origin: true}));

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('keyboardkitteh'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboardkitteh',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
