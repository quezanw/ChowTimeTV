var express = require('express');
var router = express.Router();
var request = require('request');
// var snoocontroller = require('./controllers/reddit');
var snoowrap = require('snoowrap');
var config = require('../../config');
var querystring =  require('querystring');


const mealtimeFetcher = new snoowrap({
  userAgent: config.USER_AGENT,
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  refreshToken: config.REFRESH_TOKEN
});;

let user = null;

let refreshToken = null;

var generateRandomString = function (length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

router.get('/login', (req, res) => {
  // console.log('hit login');
  // var state = generateRandomString(16);
  // let scope = 'vote'
  // let baseURL = 'https://www.reddit.com/api/v1/authorize?';
  // res.redirect(baseURL + 
  //   querystring.stringify({
  //     client_id: config.CLIENT_ID,
  //     response_type: 'code',
  //     state: state,
  //     redirect_uri: config.REDIRECT_URI,
  //     duration: 'permanent',
  //     scope: scope,
  //   })  
  // );
});

router.get('/status', (req, res) => {
  if(!req.session.signedIn) {
    req.session.signedIn = false;
  }
  res.json({signInStatus: req.session.signedIn});
});



router.get('/authorize', (req, res, next) => {
  var code = req.query.code || null;
  var redirect_uri = 'http://localhost:3001/authorize';
  var authOptions = {
    url: 'https://www.reddit.com/api/v1/access_token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(config.CLIENT_ID + ':' + config.CLIENT_SECRET).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
      refreshToken = body.refresh_token;
      user = new snoowrap({
        userAgent: config.USER_AGENT,
        clientId: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        refreshToken: refreshToken
      });
      req.session.signedIn = true;
      console.log(req.session);
    }
  });

  res.redirect('http://localhost:3000');
});



router.get('/new', async (req, res, next) => {
  try {
    const response = await mealtimeFetcher.getSubreddit('mealtimevideos').getNew({limit: 10});
    // console.log(response);
    res.json({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/hot', async (req, res, next) => {
  try {
    const response = await mealtimeFetcher.getSubreddit('mealtimevideos').getHot({limit: 10});
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/5-7', async (req, res, next) => {
  try {
    const response = await mealtimeFetcher.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"5-7 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/7-10', async (req, res, next) => {
  try {
    const response = await mealtimeFetcher.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"7-10 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/10-15', async (req, res, next) => {
  try {
    const response = await mealtimeFetcher.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"10-15 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/30plus', async (req, res, next) => {
  try {
    const response = await mealtimeFetcher.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"30 Minutes Plus"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

module.exports = router;
