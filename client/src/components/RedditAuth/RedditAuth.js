import React from 'react';
import { connect } from 'react-redux';
import { signInStatus, signOut } from '../../actions';
import './RedditAuth.scss';

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
    const url = `https://www.reddit.com/api/v1/authorize?client_id=06_IsJue03S96Q&response_type=code&state=${this.generateRandomString(16)}&redirect_uri=http://localhost:3001/authorize&duration=permanent&scope=vote`;
    if(!this.props.isSignedIn) {
      return (
        <a className='signin-btn oauth-btn' href={url}>
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