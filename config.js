var dotenv = require('dotenv');
dotenv.config({path: '../.env'});
// console.log(dotenv.config({path: "../.env"}));

module.exports = {
  USER_AGENT: process.env.USER_AGENT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  REDIRECT_URI: process.env.REDIRECT_URI
}

/*
  - always render buttons, redirect to login page if not logged in
  - add upvote count to videoItems
  - add best of the year, month, etc tabs
  - sort video items by likes (highest to lowest, lowest to highest)
  - add like score into redux store - adding a score then logging out doesn't keep the changed score

  - 

redux store states
  - video list
  - selected video
  - sign in status
  - 

Oauth to sign in
  - registered app
  - user gets redirected to reddit
  - reddit sends back refresh token used to created snoowrap object
  - snoowrap object can make request to vote,display videos on behalf of user

api calls for videos (new, hot, video length)
api calls to handle upvotes, downotes, unvotes

regex to grab and remove video length embeded in the title

upvote/downvote/unvote action creator - used in videodetail component
when button clicked ->> action is called ->> post request to the express server 
->> express server makes post request to reddit ->> dispatch video id to reducers
->> reducer loops through videos and changes the likes and status













*/