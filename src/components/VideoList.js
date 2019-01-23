import React from 'react';
import { connect } from 'react-redux';
import VideoItem from './VideoItem';

class VideoList extends React.Component {

  render() {
    console.log(this.props);
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
      <div className="ui relaxed divided list">
        {renderList}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { videos: state.videos };
}

export default connect(mapStateToProps)(VideoList);