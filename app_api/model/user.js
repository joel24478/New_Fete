/* 
	Author: Zheondre Angel Calcano
	Created: ‎Tuesday, ‎March ‎08, ‎2016, ‏‎8:02:00 PM
	File name: user.js 
	Objective: File that contains the schemas
*/
var mongoose = require('mongoose') 
var Schema = mongoose.Schema; 

var eventSchema = new Schema({
Name: {type: String, required: true}, 
Description:  String,
Location:  {type: String, required: true}, 
EventPicture: String,
Pictures: [String],
Going: Number,
GoingID: [String],
Invited: [String],  
Attended: Number,
PostDate: { type: Date, required: true},
Date: { type: Date, required: true},
StartTime: String, 
EndTime: String,  
Public: {type: Boolean, required: true},
coords: { type: [Number], index: '2dsphere'}
});

// Schema for user 
var usersSchema = new Schema({
hash: String
salt: String, 
name: {type: String, required: true}, 
email: {type: String, unigue: true, required: true},
pw: {type: String, required: true},
About: String,
Followers: Number,
Following: Number,
followersID: [String], 
followingID: [String],
totalAttended: Number,
profilepic: String, 
currentposition: { type: [Number], index: '2dsphere'},
DateofCreation:{ type: Date, required: true},
Events: [eventSchema]
}) ;

// chapter 11 from Getting Mean
usersSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

usersSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

usersSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
// need to make a schema for comments 
// need to an array of comments for each event

// var messageSchema 
// var groupSchema 

mongoose.model('Event', eventSchema); 
mongoose.model('Profile', usersSchema);