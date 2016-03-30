var request = require("request"); 
var apiOptions = {
server : "http://localhost:3000"
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};
//renderProfilepage
var renderProfilepage = function(req, res, responseBody){
  var message = ""; 
  var name = responseBody.user.name;
  var about = responseBody.user.About;
  var profilepic = responseBody.user.profilePicture; 
  var attended =  responseBody.user.Attended;  
  var followers = responseBody.user.followerCount;
  var following = responseBody.user.followingCount;
  var Events =  responseBody.events;
  console.log( Events); 
 
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No Events posted";
    }
  }
  res.render('profile', {
    events: Events,
    message: message,
	title: 'Profile',
    username: name,
    profilePicture: profilepic,
	about: about, 
    location: 'SAN ANTONIO, TX',  //this will be in the about me section
    twitter: '@' + 'COOLESOCOOL', //this will be in the about me section
    followerCount: followers,
    followingCount: following,
    attendedCount: attended
  });
};
var getProfileInfo = function( req, res, callback ) { 
  
  var requestOptions, path;
  path = '/api/profile/' + req.params.Userid; 
  
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {} 
	//userid: "56dcb3e90e36ea380c82bac7" 
  };
  //console.log( requestOptions ); 
  request(
    requestOptions,
    function(err, response, body) {
      var i, data;
      data = body;
	  //console.log( body + ' body' ); 
      callback(req, res, data);
    }
  );
} 
// GET 'Profile' page 
module.exports.profile = function(req, res){
  console.log(" running exports profile" ); 
  getProfileInfo( req, res, function( req, res,responseData) { 
	renderProfilepage( req, res, responseData);
  });
};
// event detail page ? 
var getLocationInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/profile/" + req.params.Useriid + "/Event/" + req.params.Eventid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};
//detail page
var renderDetailPage = function (req, res, locDetail) {
  
  res.render('event', {
    title: 'Event Detial',
    detail: locDetail.Description,
	username: locDetail.name,
	pageHeader: {title: locDetail.name},
	profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
	Pictures: locDetail.Pictures,
	location: locDetail.location,
	eventTime: locDetail.StartTime,
	eventEndTime: locDetail.EndTime,
	eventDate: locDetail.Date,
	PostDate: locDetail.PostDate,
	Going: locDetail.Going,
	GoingID: locDetail.GoingID,
	Invited: [String],
	Attend: locDetail.Attend,
	flyer: locDetail.EventPicture,
	Public: locDetail.Public,
	Location: locDetail.coords
  })
};

// GET event info
module.exports.event = function(req, res){
  getLocationInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

module.exports.home = function(req, res) {
    /*
	res.render('home', {
	events: loc.Events
	  });
	*/
	res.render('home', {
        title: 'Fete',
        subTitle: 'for the Party YOU want',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        username: 'Jessica',
        sharing: 'Public',
        eventDescription: 'The Party is going to be wild!',
        eventDate: 'Jun 27, 2016'
    });
};
/* Get sign-up page */
module.exports.signup = function(req, res) {
    res.render('sign-up', {
        title: 'Sign-Up', //Tab title
        pageTitle: 'Get Up-to-Date info on upcomming Parties!',
        background: '/images/signup_backgroundV2.jpg',
        legend: 'Join Fete Today'
    });
};
/* Get login page */
module.exports.login = function(req, res) {
    res.render('login', {
        title: 'Login', //Tab title
        pageTitle: 'Whats New?',
        background: '/images/signup_backgroundV2.jpg',
        panelTitle: 'Login'
    });
};

/* GET search page */
module.exports.search = function(req, res) {
    res.render('search', {
        title: 'Search',
        subTitle: 'for the Party YOU want'
    });
};

/* GET Followers page */
module.exports.followers = function(req, res) {
    res.render('followers', {
        title: 'Followers',
        username: 'Jessica',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        profilePicture2: '/images/user-image-1.jpeg',
        profilePicture3: '/images/male_model.jpeg',
        profilePicture4: '/images/backend_donkey.jpg',
        profilePicture5: '/images/user-image-2.jpg',
        profilePicture6: '/images/user-image-3.jpeg',
        profilePicture7: '/images/user-image-4.jpg',
        location: 'SAN ANTONIO, TX',
        eventTime: '11:00 PM',
        eventDate: '4/20/2016',
        details: 'Come if you want, but bring a bottle',
        flyer: '/images/august20lawrence.jpg'
    });
};

/* GET Followers page */
module.exports.index = function(req, res) {
    res.render('index', {
        username: 'Jessica',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        eventTime: '11:00'
    });
};