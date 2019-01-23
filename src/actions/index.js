import { 
  // SELECT_VIDEO,
  FETCH_NEW_VIDEOS,
  FETCH_HOT_VIDEOS,
  // FETCH_FIVESEVEN_VIDEOS,
  // FETCH_SEVENTEN_VIDEOS,
  // FETCH_TENFIFTEEN_VIDEOS,
  // FETCH_HALFHOUR_VIDEOS 
} 
from '../actions/types';


import reddit from '../apis/reddit';
// https://www.reddit.com/r/mealtimevideos/search.json?q=flair_name%3A%225-7%20Minutes%22&restrict_sr=1

export const selectVideo = video => {
  return {
    type: 'SELECT_VIDEO',
    payload: video
  }
}

export const fetchNewVideos = () => async dispatch => {
  const response = await reddit.get('/new.json', { params: {} });
  dispatch({ type: FETCH_NEW_VIDEOS, payload: response.data.data.children});
  dispatch(selectVideo(response.data.data.children[0]));
}

export const fetchHotVideos = () => async dispatch => {
  const response = await reddit.get('/top.json?t=day', { params: {} });
  dispatch({ type: FETCH_HOT_VIDEOS, payload: response.data.data.children});
  dispatch(selectVideo(response.data.data.children[0]));
}


export const fetchFiveSevenVideos = () => async dispatch => {
  const response = await reddit.get('/search.json?q=flair_name%3A"5-7%20Minutes"&restrict_sr=1', { params: {} });
  dispatch({ type: FETCH_HOT_VIDEOS, payload: response.data.data.children});
  dispatch(selectVideo(response.data.data.children[0]));
}

