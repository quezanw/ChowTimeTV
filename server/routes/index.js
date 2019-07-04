var express = require('express');
var router = express.Router();
var request = require('request');
var snoowrap = require('snoowrap');
var config = require('../../config');

function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const mealtimeFetcher = new snoowrap({
  userAgent: config.USER_AGENT,
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  refreshToken: config.REFRESH_TOKEN
});

let currentFetcher = mealtimeFetcher;

var userFetcher = null;

router.get('/status', (req, res) => {
  console.log('ping: ' + req.session.signedIn);
  if(!req.session.signedIn) {
    req.session.signedIn = false;
    res.status(200).send({signInStatus: req.session.signedIn});
  } else {
    res.status(200).send({signInStatus: req.session.signedIn});
  }
});

router.get('/login', (req, res) => {
  console.log('ping: login');
  var authenticationUrl = snoowrap.getAuthUrl({
    clientId: config.CLIENT_ID,
    scope: ['*'],
    redirectUri: config.REDIRECT_URI,
    permanent: true,
    state: generateRandomString(16)
  });
  res.status(302).redirect(authenticationUrl);
});

router.get('/authorize', (req, res, next) => {
  var code = req.query.code || null;
  var authOptions = {
    url: 'https://www.reddit.com/api/v1/access_token',
    form: {
      code: code,
      redirect_uri: config.REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(config.CLIENT_ID + ':' + config.CLIENT_SECRET).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    console.log(response.statusCode);
    if (!error && response.statusCode === 200 && !response.body.error) {
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
  // res.redirect(`localhost:3001`);
  res.redirect('https://chowtime-tv.herokuapp.com/');
  
});

router.post('/upvote', async (req, res) => {
  let response = await currentFetcher.getSubmission(req.body.postID).upvote();
  res.send({res: response });
});

router.post('/downvote', async (req, res) => {
  let response = await currentFetcher.getSubmission(req.body.postID).downvote();
  res.send({res: response });
});

router.post('/unvote', async (req, res) => {
  let response = await currentFetcher.getSubmission(req.body.postID).unvote();
  res.send({res: response });
});

router.get('/logout', (req, res, next) => {
  userFetcher = null;
  currentFetcher = mealtimeFetcher;
  req.session.signedIn = false;
  res.send({signInStatus: req.session.signedIn});
});


router.get('/new', async (req, res, next) => {
  console.log('PING: NEW');
  console.log(currentFetcher);
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

// router.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/build', 'index.html'));
// });
router.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/build/index.html"))
});

module.exports = router;