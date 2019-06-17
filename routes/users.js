const express = require('express'),
  router = express.Router(),
  request = require('request'),
  UsersControllers = require('../controllers/users-controllers');
  User = require('../models/users-model');

require('dotenv').config();

router.get('/authorize/slack', async function(req, res) {
  //console.log(process.env['CLIENT_ID'])
  request.get(`https://slack.com/api/oauth.access?client_id=${process.env['CLIENT_ID']}&client_secret=${process.env['CLIENT_SECRET']}&code=${req.query.code}`, async(error, response, body) => {
    const data = await JSON.parse(body);
    //console.log('data: ', data) 
    const team_id = data.team.id;
    console.log(team_id) 

    if(team_id == process.env['TEAM_ID']) {
      //console.log('if')
      req.session.email = data.user.email;
      req.session.bearer = data.access_token;
      req.session.is_logged_in = true;

    const user = new User(null, null, null, data.user.email, null, null, null);
    
      userProfileCheck = await user.checkUserProfile();
      console.log('user profile check ', userProfileCheck)
      if(!userProfileCheck.users_email) {
        res.redirect('/users/signup');
      } else {
          res.redirect('/projects');
      }   
    }
  })
});


router.get('/login', UsersControllers.login_page_get);

router.get('/signup', UsersControllers.sign_up_get);

//router.get('users/edit_profile', UsersControllers.edit_profile_get);

router.post('/login', UsersControllers.login_page_post);

router.post('/signup', UsersControllers.sign_up_post);

router.get('/logout', UsersControllers.logout_get);

module.exports = router;