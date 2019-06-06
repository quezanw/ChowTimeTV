import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import './VideoDetail.scss';

class VideoDetail extends React.Component {
  // decodes escaped html
  htmlDecode(input) {
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

  render() {
    const video = this.props.selectedVideo;
    if (!video) {
      return ( 
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading...</div>
        </div>
      )
    }
    const iFrameHTML = video.data.secure_media.oembed.html;
    const redditLink = `https://www.reddit.com/${video.data.permalink}`;
    return (
      <div className="video-detail-container">
        <div className="video ui embed">
          {ReactHtmlParser(this.htmlDecode(iFrameHTML))}
        </div>
        <div className="video-info">
          <h2>{video.data.title}</h2>
          <a href={redditLink} rel="noopener noreferrer" target="_blank">
            <i className="fab fa-reddit"></i>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedVideo: state.selectedVideo };
}

export default connect(mapStateToProps)(VideoDetail);