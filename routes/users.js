const express = require('express'),
  router = express.Router(),
  request = require('request'),
  UsersControllers = require('../controllers/users-controllers');
  User = require('../models/users-model');

require('dotenv').config();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Page',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

router.get('/authorize/slack', async function(req, res) {
  //console.log(process.env['CLIENT_ID'])
  request.get(`https://slack.com/api/oauth.access?client_id=${process.env['CLIENT_ID']}&client_secret=${process.env['CLIENT_SECRET']}&code=${req.query.code}`, async(error, response, body) => {
    const data = await JSON.parse(body)
    console.log('data: ', data) 
    const team_id = data.team.id;
    console.log(team_id) 
    console.log(process.env['TEAM_ID'])

    if(team_id == process.env['TEAM_ID']) {
      console.log('if')
      req.session.email = data.email;
      req.session.bearer = data.access_token;
      req.session.is_logged_in = true;
      req.session.status = data.ok;

    const user = new User(null, null, null, req.session.email);
    userCheck = await user.checkUserProfile();
    console.log(userCheck)
    if(userCheck.first_name == true) {
      res.redirect('/users/signup');
    } else {
        res.redirect('/')
      }
    }
  })


//GET https://slack.com/api/oauth.access?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=XXYYZZ

  //https://slack.com/api/oauth.access
  
});


router.get('/login', UsersControllers.login_page_get);

router.get('/signup', UsersControllers.sign_up_get);

//router.get('users/edit_profile', UsersControllers.edit_profile_get);

router.post('/login', UsersControllers.login_page_post);

router.post('/signup', UsersControllers.sign_up_post);

router.get('/logout', UsersControllers.logout_get);

module.exports = router;
