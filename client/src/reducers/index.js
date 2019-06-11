import { combineReducers } from 'redux';

import videosReducer from './videosReducer';
import selectedVideoReducer from './selectVideoReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  videos: videosReducer,
  selectedVideo: selectedVideoReducer,
  loggedInUser: loginReducer
});