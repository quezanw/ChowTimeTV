var express = require('express');
var router = express.Router();
var snoowrap = require('snoowrap');
var config = require('../../config');


const r = new snoowrap({
  userAgent: config.USER_AGENT,
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  refreshToken: config.REFRESH_TOKEN
});
/* GET home page. */
router.get('/reddit', async (req, res, next) => {
  try {
    const data = await r.getSubreddit('mealtimevideos').getHot({count: 10});
    console.log(data);
    res.send({data: data});
  } catch(error) {
    console.log(r.config({debug: true}));
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
