import React from 'react';
import { connect } from 'react-redux';
import { signInStatus, signOut } from '../../actions';
import './RedditAuth.scss';
import snoowrap from 'snoowrap';

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
      clientId: process.env.REACT_APP_CLIENT_ID,
      scope: ['*'],
      redirectUri: process.env.REACT_APP_HOST_URL,
      permanent: true,
      state: this.generateRandomString(16)
    });
    
    if(!this.props.isSignedIn) {
      return (
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