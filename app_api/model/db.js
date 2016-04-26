/*
  File:  app_api/model/db.js
  91.462 Project Milestone 
  created by Simon Homles
  https://github.com/simonholmes/getting-MEAN
*/

var mongoose = require( 'mongoose' )
// create connection
var gracefulShutdown;
//need to hide pw and username to db..... ** 
var dbURI = 'mongodb://Zheondre:Madness978@ds019068.mlab.com:19068/fete' ;
//var dbURI = 'mongodb://localhost/c/Users/Madness/Documents/GitHub/Joel/Fete/temp/mongodump/Fete';

//var dbURI = process.env.MONGOLAB_URI;
 
mongoose.connect(dbURI); 
mongoose.connection.on('connected', function () {
console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
});
gracefulShutdown = function (msg, callback) {
mongoose.connection.close(function () {
console.log('Mongoose disconnected through ' + msg);
callback();
});
};
// For nodemon restarts
process.once('SIGUSR2', function () {
gracefulShutdown('nodemon restart', function () {
process.kill(process.pid, 'SIGUSR2');
});
});
// For app termination
process.on('SIGINT', function() {
gracefulShutdown('app termination', function () {
process.exit(0);
});
});
// For Heroku app termination
process.on('SIGTERM', function() {
gracefulShutdown('Heroku app shutdown', function () {
process.exit(0);
});
});

require('./user');