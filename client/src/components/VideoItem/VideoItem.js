import './VideoItem.css';
import video_placeholder from '../images/video_placeholder.png';
import React from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../../actions';

class VideoItem extends React.Component {
  constructor(props) {
    super();
  }

  renderImg(video) {
    let imgSrc = video.data.secure_media;
    if(!imgSrc) {
      imgSrc = video_placeholder;
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

  adjustTitleLength(str) {
    return str.length <= 99 ? str : (str.slice(0,99) + '...');
  }
  render() {
    
    const video = this.props.video;
    return (
      <div key={video.id} 
           className="video-item item"
           onClick={ () => this.props.selectVideo(video)}>
           {this.renderImg(video)}
        <div className="content">
          <div className="header video-item__title">
            {this.adjustTitleLength(video.data.title)}
          </div>
        </div>
      </div>
    );
  }

}

export default connect(null,{ selectVideo })(VideoItem);