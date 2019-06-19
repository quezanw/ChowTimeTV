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


export const selectVideo = video => {
    return {
      type: 'SELECT_VIDEO',
      payload: video
    }
}

export const videoLikeStatus = status => {
  return {
    type: 'LIKE_STATUS',
    payload: status
  }
}

// export const updateSelectedVideoDetails = (video) => dispatch => {
//   dispatch(selectVideo(video));
//   dispatch(videoLikeStatus(video.likes));
// }

// export const upvote = async postID => {
//   const response = await reddit.post('/upvote', { postID: postID });
//   console.log(response);
// }

// export const signIn = () =>  {
//   // const response await 
//   reddit.get('/login');
//   console.log('signIn hit');
//   // console.log(response);
// }

export const signOut = () => async dispatch => {
  const response = await reddit.get('/logout');
  // console.log(response.data.signInStatus);
  dispatch({ type: "SIGNOUT", payload: response.data.signInStatus });
};

export const signInStatus = () => async dispatch => {
  const response =  await reddit.get('/');
  // console.log(response.data.signInStatus);
  dispatch({ type: "SIGNIN", payload: response.data.signInStatus});
}

export const fetchNewVideos = () => async dispatch => {
  const response = await reddit.get(NEW);
  // console.log(response.data);
  dispatch({ type: FETCH_NEW_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
  dispatch(videoLikeStatus(response.data.data[0].likes));
}

export const fetchHotVideos = () => async dispatch => {
  const response = await reddit.get(HOT);
  dispatch({ type: FETCH_HOT_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
  dispatch(videoLikeStatus(response.data.data[0].likes));
}


export const fetchFiveSevenVideos = () => async dispatch => {
  const response = await reddit.get(FIVESEVEN);
  dispatch({ type: FETCH_FIVESEVEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
  dispatch(videoLikeStatus(response.data.data[0].likes));
}

export const fetchSevenTenVideos = () => async dispatch => {
  const response = await reddit.get(SEVENTEN);
  dispatch({ type: FETCH_SEVENTEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
  dispatch(videoLikeStatus(response.data.data[0].likes));

}
export const fetchTenFifteenVideos = () => async dispatch => {
  const response = await reddit.get(TENFIFTEEN);
  dispatch({ type: FETCH_TENFIFTEEN_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
  dispatch(videoLikeStatus(response.data.data[0].likes));
}

export const fetchHalfHourVideos = () => async dispatch => {
  const response = await reddit.get(HALFHOUR);
  dispatch({ type: FETCH_HALFHOUR_VIDEOS, payload: response.data.data});
  dispatch(selectVideo(response.data.data[0]));
  dispatch(videoLikeStatus(response.data.data[0].likes));
}
