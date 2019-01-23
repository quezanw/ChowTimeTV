import { SELECT_VIDEO } from '../actions/types';

export default (selectedVideo=null, action) => {
  if(action.type === SELECT_VIDEO) {
    return action.payload;
  }
  return selectedVideo;
}