const INITIAL_STATE = {
  isSignedIn: false
  // id: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SIGNIN':
      console.log({...state, isSignedIn: action.payload })
     return {...state, isSignedIn: action.payload };
    case 'SIGNOUT':
    return {...state, isSignedIn: action.payload };
     default:
      return state;
  }
}