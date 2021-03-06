import './VideoItem.scss';
import video_placeholder from '../images/video_placeholder.png';
import React from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../../actions';

class VideoItem extends React.Component {
  constructor(props) {
    super();
  }

  renderImg(video) {
    let imgSrc = video.secure_media;
    if(!imgSrc) {
      imgSrc = video_placeholder;
    } else {
      imgSrc = video['secure_media'].oembed['thumbnail_url']
      imgSrc = imgSrc.replace('hqdefault', 'mqdefault');
    }
    return (
      <img
        className="" 
        src={imgSrc} 
        alt={video.title}
      />
    );
  }

  adjustTitleLength(str) {
    if(str.length >= 100) {
      return `${str.slice(0, 90)}...`;
    }
    if(str) {
      let regex = /\[\d+:\d+\]/g;
      str = str.replace(regex, '');
    }
    return str;
  }
  render() {
    const video = this.props.video;
    let regex = /\d+[:|.]\d+/g;
    let videoLength = '';
    if(video.title) {
      videoLength = video.title.match(regex);
    }
    if(video['secure_media'] === null) {
      return (<div></div>);
    } else {
      return (
        <div 
            key={video.id} 
            className="video-item"
            onClick={ () => this.props.selectVideo(video)}>
          <div className="img-container">
            {this.renderImg(video)}
            <span className="video-length">{videoLength}</span>
          </div>
          <div className="video-item-title">
            {this.adjustTitleLength(video.title)}
          </div>
        </div>
      );
    }
  }
}

export default connect(null,{ selectVideo })(VideoItem);