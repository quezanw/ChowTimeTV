import React from 'react';
import { connect } from 'react-redux';
import VideoItem from './VideoItem';

class VideoList extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div className="ui relaxed divided list">
        Video List
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { videos: state.videos };
}

export default connect(mapStateToProps)(VideoList);