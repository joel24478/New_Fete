var mongoose = require('mongoose') 
var Schema = mongoose.Schema; 

//need the name of the event
// need date posted
//going to need an array of users for the going
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

//need time of creation 
var usersSchema = new Schema({ 
name: {type: String, required: true}, 
email: {type: String, required: true},
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

// need to make a schema for comments 
// need to an array of comments for each event

// var messageSchema 
// var groupSchema 

mongoose.model('Event', eventSchema); 
mongoose.model('Profile', usersSchema);