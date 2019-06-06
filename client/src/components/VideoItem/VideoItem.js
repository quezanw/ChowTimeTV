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
    // console.log(video.data);
    let imgSrc = video.data.secure_media;
    if(!imgSrc) {
      imgSrc = video_placeholder;
    } else {
      imgSrc = video.data['secure_media'].oembed['thumbnail_url']
      imgSrc = imgSrc.replace('hqdefault', 'mqdefault');
    }
    return (
      <img
        className="" 
        src={imgSrc} 
        alt={video.data.title}
      />
    );
  }

  // implement regex that can remove the timestamp from the title ie: '[9:10]'
  adjustTitleLength(str) {
    return str.length >= 70 ? (str.slice(0,99) + '...') : str;
  }
  render() {
    
    const video = this.props.video;
    return (
      <div 
          key={video.id} 
          className="video-item"
          onClick={ () => this.props.selectVideo(video)}>
        <div className="img-container">
          {this.renderImg(video)}
        </div>
        <div className="video-item-title">
          {this.adjustTitleLength(video.data.title)}
        </div>
      </div>
    );
  }

}

export default connect(null,{ selectVideo })(VideoItem);