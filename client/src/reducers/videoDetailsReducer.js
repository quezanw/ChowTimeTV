
export default (likeStatus=null, action) => {
  if(action.type === 'LIKE_STATUS') {
    return action.payload;
  }
  return likeStatus;
};