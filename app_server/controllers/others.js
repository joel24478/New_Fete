/*
  File:  app_server/app_server/controllers/others.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  created by Simon Homles
  https://github.com/simonholmes/getting-MEAN
*/


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