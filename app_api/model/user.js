var mongoose = require('mongoose') 
var Schema = mongoose.Schema; 

//need the name of the event
//need the start and end time of the event; 
var eventSchema = new Schema({ 
Description:  {type: String, required: true},
Location:  {type: String, required: true}, 
Pictures: [String], 
Going: Number, 
Attended: Number,
Date: { type: Date, required: true}, 
Public: {type: Boolean, required: true},
coords: { type: [Number], index: '2dsphere'}
});

//add profile_pic, total attended, array of follower ids to the user schema
//need current position
var usersSchema = new Schema({ 
name: {type: String, required: true}, 
email: {type: String, required: true},
pw: {type: String, required: true},
About: String,
Followers: Number,
Following: Number,
Events: [eventSchema]
}) ;

// need to make a schema for comments 
// need to an array of comments for each event

// var messageSchema 
// var groupSchema 

mongoose.model('Event', eventSchema); 
mongoose.model('Profile', usersSchema);