import React from 'react';
import Header from './Header';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import { connect } from 'react-redux';
import { fetchNewVideos } from '../actions';

import '../styles/main.css';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchNewVideos();
  }

  render() {
    console.log(this.props.videos)
    return (
      <div className="ui app-container">
        <Header />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail />
          </div>
          <div className="five wide column">
            <VideoList/>
          </div>
        </div>
      </div>
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