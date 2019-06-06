import React from 'react';
import { connect } from 'react-redux';
import VideoItem from '../VideoItem/VideoItem';
import './VideoList.scss';

class VideoList extends React.Component {

  render() {
    const renderList = this.props.videos.map(video => {
      // if(!video.data.stickied)
      return (
        <VideoItem
          key={video.data.id}
          video={video}
        />
      );
    });

    return (
      <div className="video-list">
        {renderList}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { videos: state.videos };
}

export default connect(mapStateToProps)(VideoList);