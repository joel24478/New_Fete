var signupCtrl = function(req, res) {
    res.render('sign-up', {
        title: 'Sign-Up', //Tab title
        pageTitle: 'Get Up-to-Date info on upcomming Parties!',
        background: '/images/signup_backgroundV2.jpg',
        legend: 'Join Fete Today'
    });
};