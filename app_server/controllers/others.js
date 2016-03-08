/* GET Home page */
// module.exports.index = function(req, res) {
//     res.render('index', {
//         title: 'Express'
//     });
// };

/* GET About page*/
module.exports.about = function(req, res) {
    res.render('index', {
        title: 'About',
        background: '#FFFFFF'
    });
};