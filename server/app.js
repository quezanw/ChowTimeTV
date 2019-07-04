var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var router = require('./routes/index');
var app = express();

app.options('*', cors());
var allowedOrigins = [
                      'http://localhost:3000',
                      'http://localhost:3001',
                      'http://192.168.0.119:3000',
                      'http://192.168.0.119:3001',
                      'https://chowtime-tv.herokuapp.com',
                      'http://0.0.0.0:3000',
                      'http://0.0.0.0:3001',

                    ];

app.use(cors({
  origin: function(origin, callback){

    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },  credentials: true
}));

// app.use(cors({credentials: true, origin: true}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('keyboardkitteh'));
app.use(express.static(path.join(__dirname, '../client/build')));
// app.use(express.static(path.join(__dirname, '/public/build')));

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
