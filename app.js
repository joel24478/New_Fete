/*
	File:  
	COMP 4620 Project: Fete
	Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
	Copyright (c) 2016 by Angel Calcano.  All rights reserved.  May be freely 
	copied or excerpted for educational purposes with credit to the author.
	created by AC on .
*/

require('dotenv').load();
var express = require('express');
var sassMiddleware = require('node-sass-middleware');
//var sass = require('node-sass');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./app_api/model/db');
require('./app_api/config/passport');
 
var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

var appClientFiles = [
  'app_client/app.js',
  'app_client/home/home.controller.js',
  'app_client/about/about.controller.js',
  'app_client/auth/login/login.controller.js',
  'app_client/auth/register/register.controller.js',
  'app_client/locationDetail/locationDetail.controller.js',
  'app_client/reviewModal/reviewModal.controller.js',
  'app_client/common/services/authentication.service.js',
  'app_client/common/services/geolocation.service.js',
  'app_client/common/services/loc8rData.service.js',
  'app_client/common/filters/formatDistance.filter.js',
  'app_client/common/filters/addHtmlLineBreaks.filter.js',
  'app_client/common/directives/navigation/navigation.controller.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
  'app_client/common/directives/pageHeader/pageHeader.directive.js',
  'app_client/common/directives/ratingStars/ratingStars.directive.js'
];

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// adding the sass middleware
//http://stackoverflow.com/questions/23711897/get-sass-to-autocompile-with-nodejs-express-and-node-sass/27345470#27345470
app.use(
    sassMiddleware({
        src: __dirname + '/sass',
        dest: __dirname + '/public/stylesheets',
        prefix: '/stylesheets',
        debug: true,
    })
);

app.use(cookieParser());
// The static middleware must come after the sass middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());
//app.use('/', routes);
app.use('/api', routesApi);

//Add catchall app.use function to respond to any
//requests that make it this far by sending HTML file
app.use(function(req, res) {
res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});
// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
if (err.name === 'UnauthorizedError') {
res.status(401);
res.json({"message" : err.name + ": " + err.message});
}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;