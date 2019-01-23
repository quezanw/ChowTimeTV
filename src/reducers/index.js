import { combineReducers } from 'redux';

import videosReducer from './videosReducer';
import selectedVideoReducer from './selectVideoReducer';


export default combineReducers({
  videos: videosReducer,
  selectedVideo: selectedVideoReducer
});