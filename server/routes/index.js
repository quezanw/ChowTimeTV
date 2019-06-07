var express = require('express');
var router = express.Router();
// var snoocontroller = require('./controllers/reddit');
var snoowrap = require('snoowrap');
var config = require('../../config')


const r = new snoowrap({
  userAgent: config.USER_AGENT,
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  refreshToken: config.REFRESH_TOKEN
});


router.get('/new', async (req, res, next) => {
  try {
    const response = await r.getSubreddit('mealtimevideos').getNew();
    // console.log(response);
    res.json({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/hot', async (req, res, next) => {
  try {
    const response = await r.getSubreddit('mealtimevideos').getHot();
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/5-7', async (req, res, next) => {
  try {
    const response = await r.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"5-7 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/7-10', async (req, res, next) => {
  try {
    const response = await r.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"7-10 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});


router.get('/10-15', async (req, res, next) => {
  try {
    const response = await r.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"10-15 Minutes"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

router.get('/30plus', async (req, res, next) => {
  try {
    const response = await r.getSubreddit('mealtimevideos')
      .search({query: 'flair_name:"30 Minutes Plus"'})
    res.send({data: response});
  } catch(error) {
    res.send(error);
  }
});

module.exports = router;
