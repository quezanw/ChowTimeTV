import { 
  // SELECT_VIDEO,
  FETCH_NEW_VIDEOS,
  FETCH_HOT_VIDEOS,
  FETCH_FIVESEVEN_VIDEOS,
  FETCH_SEVENTEN_VIDEOS,
  FETCH_TENFIFTEEN_VIDEOS,
  FETCH_HALFHOUR_VIDEOS,
  // queries
  NEW,
  HOT,
  FIVESEVEN,
  SEVENTEN,
  TENFIFTEEN,
  HALFHOUR
} 
from '../actions/types';


import reddit from '../apis/reddit';
// import redditOAuth from '../apis/redditOAuth';
// import redditOAuth from '../apis/redditOAuth';
// https://www.reddit.com/r/mealtimevideos/search.json?q=flair_name%3A%225-7%20Minutes%22&restrict_sr=1

export const selectVideo = video => {
  return {
    type: 'SELECT_VIDEO',
    payload: video
  }
}

export const signIn = () =>  async dispatch => {
  // const response await 
  const response = await reddit.get('/login');
  console.log('signIn hit');
  // console.log(response);
}

export const signInStatus = () => async dispatch => {
  const response =  await reddit.get('/status');
  console.log(response);
  dispatch({ type: "SIGNIN", payload: response.signInStatus});
}

export const fetchNewVideos = () => async dispatch => {
  const response = await reddit.get(NEW);
  // console.log(response.data);
  dispatch({ type: FETCH_NEW_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}

export const fetchHotVideos = () => async dispatch => {
  const response = await reddit.get(HOT);
  dispatch({ type: FETCH_HOT_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}


export const fetchFiveSevenVideos = () => async dispatch => {
  const response = await reddit.get(FIVESEVEN);
  dispatch({ type: FETCH_FIVESEVEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}

export const fetchSevenTenVideos = () => async dispatch => {
  const response = await reddit.get(SEVENTEN);
  dispatch({ type: FETCH_SEVENTEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));

}
export const fetchTenFifteenVideos = () => async dispatch => {
  const response = await reddit.get(TENFIFTEEN);
  dispatch({ type: FETCH_TENFIFTEEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}

export const fetchHalfHourVideos = () => async dispatch => {
  const response = await reddit.get(HALFHOUR);
  dispatch({ type: FETCH_HALFHOUR_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}
