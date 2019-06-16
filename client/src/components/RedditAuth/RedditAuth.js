import React from 'react';
import { connect } from 'react-redux';
import { signInStatus, signOut } from '../../actions';
import './RedditAuth.scss';
import snoowrap from 'snoowrap';
import reddit from '../../apis/reddit';

class RedditAuth extends React.Component {

  componentDidMount() {
    this.props.signInStatus();
  }

  generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


  renderButton() {
    var authenticationUrl = snoowrap.getAuthUrl({
      clientId: '06_IsJue03S96Q',
      scope: ['*'],
      redirectUri: 'http://localhost:3001/authorize',
      permanent: true,
      state: this.generateRandomString(16) // a random string, this could be validated when the user is redirected back
    });
    
    // window.location = authenticationUrl;
    // const url = `https://www.reddit.com/api/v1/authorize?client_id=06_IsJue03S96Q&response_type=code&state=${this.generateRandomString(16)}&redirect_uri=http://localhost:3001/authorize&duration=permanent&scope=vote%20idenity%20edit%20flair%20history%20save%20submit%20subscribe`;
    if(!this.props.isSignedIn) {
      return (
        // <button className='signin-btn oauth-btn' onClick={() => reddit.get('/login')}>
        //   Login
        // </button>
        <a className='signin-btn oauth-btn' href={authenticationUrl}>
          Login
        </a>
      );
    } else {
      return (
        <button onClick={() => this.props.signOut()} className='signout-btn oauth-btn' href="locahold">
          Logout
        </button>
      );
    }
  }
  
  render() {
    return (
      <div className="btn-container">
        {this.renderButton()}
      </div>
    );
  };
}

const mapStateToProps = state => ({ isSignedIn: state.isSignedIn.isSignedIn });

export default connect(mapStateToProps, {signInStatus, signOut})(RedditAuth);