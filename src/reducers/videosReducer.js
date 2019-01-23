import { 
  SELECT_VIDEO,
  FETCH_NEW_VIDEOS,
  FETCH_HOT_VIDEOS,
  FETCH_FIVESEVEN_VIDEOS,
  FETCH_SEVENTEN_VIDEOS,
  FETCH_TENFIFTEEN_VIDEOS,
  FETCH_HALFHOUR_VIDEOS 
} 
from '../actions/types';

export default (videos = [], action) => {
  switch(action.type) {
    case FETCH_NEW_VIDEOS:
      return action.payload;
    case FETCH_HOT_VIDEOS:
      return action.payload;
    case FETCH_FIVESEVEN_VIDEOS:
      return action.payload;
    default:
      return videos;
  }
}