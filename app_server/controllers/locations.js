/* Get home page */
module.exports.home = function(req, res) {
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

/* GET profile page */
module.exports.profile = function(req, res) {
    res.render('profile', {
        title: 'Profile',
        username: 'Jessica',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        location: 'SAN ANTONIO, TX',
        twitter: '@' + 'COOLESOCOOL',
        followerCount: '2,784',
        followingCount: '456',
        attendedCount: '4,901'
    });
};
/* GET event page */
module.exports.event = function(req, res) {
    res.render('event', {
        title: 'Event Details',
        username: 'Jessica',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        location: 'SAN ANTONIO, TX',
        eventTime: '11:00 PM',
        eventDate: '4/20/2016',
        details: 'Come if you want, but bring a bottle',
        flyer: '/images/august20lawrence.jpg'
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