import './VideoItem.css';
import React from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../actions';

class VideoItem extends React.Component {
  constructor(props) {
    super();
  }

  renderImg(video) {
    let imgSrc = video.data.secure_media;
    if(!imgSrc) {
      imgSrc = '';
    } else {
      imgSrc = video.data['secure_media'].oembed['thumbnail_url']
    }
    return (
      <img
        className="ui image" 
        src={imgSrc} 
        alt={video.data.title}
      />
    );
  }
  render() {
    
    const video = this.props.video;
    return (
      <div key={video.id} 
           className="video-item item"
           onClick={ () => this.props.selectVideo(video)}>
           {this.renderImg(video)}
        <div className="content">
          <div className="header">{video.data.title}</div>
        </div>
      </div>
    );
  }

}

export default connect(null,{ selectVideo })(VideoItem);