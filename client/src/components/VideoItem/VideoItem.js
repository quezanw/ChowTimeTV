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
    // console.log(video);
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

  // implement regex that can remove the timestamp from the title ie: '[9:10]'
  adjustTitleLength(str) {
    let regex = /\[\d+:\d+\]/g;
    str = str.replace(regex, '');
    return str;
  }
  render() {
    const video = this.props.video;
    let regex = /\[\d+:\d+\]/g;
    let videoLength = video.title.match(regex)[0];
    return (
      <div 
          key={video.id} 
          className="video-item"
          onClick={ () => this.props.selectVideo(video)}>
        <div className="img-container">
          {this.renderImg(video)}
          <p className="video-length">{videoLength}</p>
        </div>
        <div className="video-item-title">
          {this.adjustTitleLength(video.title)}
        </div>
      </div>
    );
  }

}

export default connect(null,{ selectVideo })(VideoItem);