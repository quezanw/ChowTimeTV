import { combineReducers } from 'redux';

import videosReducer from './videosReducer';
import selectedVideoReducer from './selectVideoReducer';
import loginReducer from './loginReducer';
import videoDetailsReducer from './videoDetailsReducer';

export default combineReducers({
  videos: videosReducer,
  selectedVideo: selectedVideoReducer,
  isSignedIn: loginReducer,
  videoDetails: videoDetailsReducer
});