import React from 'react';
import { connect } from 'react-redux';
import { signIn, signInStatus } from '../../actions';
import './RedditAuth.scss';

class RedditAuth extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.signInStatus();
  }
  

  render() {
    let url = 'https://www.reddit.com/api/v1/authorize?client_id=06_IsJue03S96Q&response_type=code&state=this1is2a3random4string5&redirect_uri=http://localhost:3001/authorize&duration=permanent&scope=vote';
    if(!this.props.signInStatus) {
      return (
        <div>
          <a className='signin-btn' href={url}>
            Login
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <a className='signout-btn' href="localhost">logout</a>
        </div>
      );
    }
  };
}

const mapStateToProps = state => {
  return { signInStatus: state.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signInStatus})(RedditAuth);