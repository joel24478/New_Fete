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