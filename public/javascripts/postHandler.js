/*
  File:  Fete/public/javascripts/postHandler.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
*/

//Pulls post of the server
function getPost() {
    var node = document.getElementById("template").cloneNode(true);
    node.id = "post"; // Don't forget :)
    // modify node contents with DOM manipulation
    document.getElementById("post").appendChild(node);
}

function placePost() {

}

//Places Images in followers pages
function placeFollowers() {
    $('#profileTarget').load('/profile #profileClip');
}