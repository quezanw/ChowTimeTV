import React from 'react';
import Header from '../Header/Header';
import VideoList from '../VideoList/VideoList';
import VideoDetail from '../VideoDetail/VideoDetail';
import { connect } from 'react-redux';
import { fetchNewVideos } from '../../actions';
import './App.scss';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchNewVideos();
  }
  render() {
    return (
      <div className="app-container">
        <Header />
        <VideoDetail />
        <VideoList/>
    </div>
    );
  }
}

export default connect(null, { fetchNewVideos })(App);