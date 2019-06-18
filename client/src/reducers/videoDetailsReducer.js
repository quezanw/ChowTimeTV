
export default (likeStatus=null, action) => {
  // console.log(action)
  if(action.type === 'LIKE_STATUS') {
    return action.payload;
  }
  return likeStatus;
};