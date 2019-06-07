import React from 'react';
import Header from '../Header/Header';
import VideoList from '../VideoList/VideoList';
import VideoDetail from '../VideoDetail/VideoDetail';
import { connect } from 'react-redux';
import { fetchNewVideos } from '../../actions';
import './App.scss';
// import snoowrap from 'snoowrap';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchNewVideos();
  }

  render() {
    console.log(this.props.videos)
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


  // componentDidMount() {
  //   this.getData();
  // }

  // async getData() {
  //   const api = axios.create({
  //     baseURL: 'https://www.reddit.com/r/mealtimevideos',
  //   });
  //   const response = await api.get('/new.json?', { 
  //     params: {
  //       sort: 'hot'
  //     }
  //   })
  //   console.log(response.data.data.children[0].data.url);
  //   console.log(response.data.data.children[0]);
  // }