const INITIAL_STATE = {
  isSignedIn: false
  // id: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SIGNIN':
     return {...state, isSignedIn: action.payload };
    case 'SIGNOUT':
    return {...state, isSignedIn: action.payload };
     default:
      return state;
  }
}