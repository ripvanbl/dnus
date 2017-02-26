var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var index = require('./routes/index');
var redisClient = require('./lib/redisClient');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to the redis server
redisClient.connect();

app.use('/api', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ "status": "general error" });
});

process.on('SIGINT', function() {
    console.log('SIGINT: Closing redis connection');
    redisClient.close();
});

process.on('uncaughtException', function(err) {
    if (err) console.log(err, err.stack);
});

module.exports = app;
