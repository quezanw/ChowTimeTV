import { 
  // SELECT_VIDEO,
  FETCH_NEW_VIDEOS,
  FETCH_HOT_VIDEOS,
  FETCH_FIVESEVEN_VIDEOS,
  FETCH_SEVENTEN_VIDEOS,
  FETCH_TENFIFTEEN_VIDEOS,
  FETCH_HALFHOUR_VIDEOS 
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

// export const fetchNewVideos = () => async dispatch => {
//   const response = await reddit.get('/new', { params: {} });
//   dispatch({ type: FETCH_NEW_VIDEOS, payload: response.data.data.children});
//   dispatch(selectVideo(response.data.data.children[0]));
// }

export const fetchNewVideos = () => async dispatch => {
  const response = await reddit.get('/new');
  // console.log(response.data);
  dispatch({ type: FETCH_NEW_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[1]));
}

export const fetchHotVideos = () => async dispatch => {
  const response = await reddit.get('/hot');
  dispatch({ type: FETCH_HOT_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}


export const fetchFiveSevenVideos = () => async dispatch => {
  const response = await reddit.get('/5-7');
  dispatch({ type: FETCH_FIVESEVEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}

export const fetchSevenTenVideos = () => async dispatch => {
  const response = await reddit.get('/7-10');
  dispatch({ type: FETCH_SEVENTEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));

}
export const fetchTenFifteenVideos = () => async dispatch => {
  const response = await reddit.get('/10-15');
  dispatch({ type: FETCH_TENFIFTEEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}

export const fetchHalfHourVideos = () => async dispatch => {
  const response = await reddit.get('/30plus', { params: {} });
  dispatch({ type: FETCH_HALFHOUR_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
}

