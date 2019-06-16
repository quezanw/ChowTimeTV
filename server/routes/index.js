var express = require('express');
var router = express.Router();
var request = require('request');
// var snoocontroller = require('./controllers/reddit');
var snoowrap = require('snoowrap');
var config = require('../../config');

const mealtimeFetcher = new snoowrap({
  userAgent: config.USER_AGENT,
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  refreshToken: config.REFRESH_TOKEN
});

let currentFetcher = mealtimeFetcher;

var userFetcher = null;
// let refreshToken = null;

router.get('/', (req, res) => {
  if(!req.session.signedIn) {
    req.session.signedIn = false;
    res.status(200).send({signInStatus: req.session.signedIn});
  } else {
    res.status(200).send({signInStatus: req.session.signedIn});
  }
});

router.get('/login', (req, res) => {
  console.log('login hit');
  var authenticationUrl = snoowrap.getAuthUrl({
    clientId: '06_IsJue03S96Q',
    scope: ['*'],
    redirectUri: 'http://localhost:3001/authorize',
    permanent: true,
    state: 'fe211bebc52eb3da9bef8db6e63104d3' // a random string, this could be validated when the user is redirected back
  });
  res.status(302).redirect(authenticationUrl);
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
      userFetcher = new snoowrap({
        userAgent: config.USER_AGENT,
        clientId: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        refreshToken: body.refresh_token
      });
      currentFetcher = userFetcher;
      req.session.signedIn = true;
      req.session.save();
    }
  });
  res.redirect('http://localhost:3000');
});

router.post('/upvote', async (req, res) => {
  let response = await currentFetcher.getSubmission(req.body.postID).upvote();
  res.send({ msg:'success', res: response });
});

router.post('/downvote', async (req, res) => {
  let response = await currentFetcher.getSubmission(req.body.postID).downvote();
  res.send({ msg:'success', res: response });
});

router.get('/logout', (req, res, next) => {
  userFetcher = null;
  currentFetcher = mealtimeFetcher;
  req.session.signedIn = false;
  res.send({signInStatus: req.session.signedIn});
});


router.get('/new', async (req, res, next) => {
  try {
    const response = await currentFetcher.getSubreddit('mealtimevideos').getNew({limit: 10});
    res.json({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/hot', async (req, res, next) => {
  try {
    const response = await currentFetcher.getSubreddit('mealtimevideos').getHot({limit: 10});
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/5-7', async (req, res, next) => {
  try {
    const response = await currentFetcher.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"5-7 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/7-10', async (req, res, next) => {
  try {
    const response = await currentFetcher.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"7-10 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/10-15', async (req, res, next) => {
  try {
    const response = await currentFetcher.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"10-15 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/30plus', async (req, res, next) => {
  try {
    const response = await currentFetcher.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"30 Minutes Plus"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

module.exports = router;