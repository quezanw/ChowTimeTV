import './VideoItem.css';
import React from 'react';
import { connect } from 'react-redux';

class VideoItem extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const video = this.props.video;
    return (
      <div key={video.id} 
           className="video-item item">
        <img
          className="ui image" 
          src={video.data.media.oembed.thumbnail_url} 
          alt={video.data.title}
        />
        <div className="content">
          <div className="header">{video.data.title}</div>
        </div>
      </div>
    );
  }

}

export default connect(null)(VideoItem);