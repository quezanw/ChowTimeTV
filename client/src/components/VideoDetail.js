import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

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

    return (
      <div>
        <div className="ui embed">
          {ReactHtmlParser(this.htmlDecode(iFrameHTML))}
        </div>
        <div className="ui segment">
          <h4 className="ui header">{video.data.title}</h4>
          {/* <p className="">{video.snippet.description}</p>     */}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedVideo: state.selectedVideo };
}

export default connect(mapStateToProps)(VideoDetail);